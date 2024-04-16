using System.Text;
using System.Text.RegularExpressions;
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Services.Constants;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace BH.Services.Extensions;

public interface IBackgroundTaskService
{
    Task<double> GetProgressPercentage();
    Task StartBackgroundTask();
}
public class BackgroundTaskService : IBackgroundTaskService
{
    private double progressPercentage = 0;
    private volatile bool isRunning = false;
    private readonly IScreeningService _screeningService;
    private readonly IWorkflowMasterService _workflowMasterService;
    private readonly IJobPostService _jobPostService;
    private readonly IResultService _resultService;
    private readonly IExtractFile _extractFile;
    private readonly APISettings _apiSettings;

    public BackgroundTaskService(IScreeningService screeningService, IWorkflowMasterService workflowMasterService,
        IJobPostService jobPostService
        , IResultService resultService, IExtractFile extractFile, IOptions<APISettings> apiSettings
        )
    {
        _screeningService = screeningService;
        _workflowMasterService = workflowMasterService;
        _jobPostService = jobPostService;
        _resultService = resultService;
        _extractFile = extractFile;
        _apiSettings = apiSettings.Value;
    }

    public async Task<double> GetProgressPercentage()
    {
        return isRunning ? progressPercentage : 0;
    }

    public async Task StartBackgroundTask()
    {
        if (isRunning)
        {
            // Background task is already running
            return;
        }

        isRunning = true;
        List<EvaluationModel> resultParsers = new List<EvaluationModel>();
        var queuedProcess = await _screeningService.GetQueuedScreening();
        var jobReq = await _jobPostService.GetJobPostById(queuedProcess.Data.JobPostId);

        try
        {
            
            if(queuedProcess.Data == null)
            {
                isRunning = false;
                return;
            }
            while (true)
            {
                if (!queuedProcess.IsSuccess || queuedProcess.Data == null)
                {
                    isRunning = false;
                    _screeningService.DeleteByJobPostId(queuedProcess.Data.JobPostId);
                    return;
                }

                var workflow = await _workflowMasterService.GetWorkflowMasterById(queuedProcess.Data.WorkflowMasterId);
                
                var fileLinks = new Dictionary<string, string>();
                try
                {
                    fileLinks = _extractFile.Extract(queuedProcess.Data.LocationPath);
                }
                catch(Exception e)
                {
                    isRunning = false;
                    _screeningService.DeleteByJobPostId(queuedProcess.Data.JobPostId);
                    return;
                }
                
                UpdateJobPostStatus(jobReq.Data, SettingConstants.SCREENING_IN_PROGRESS);
                updateScreeningStatus(queuedProcess.Data, SettingConstants.REQUEST_IN_PROGRESS);

                //var localTask = queuedProcess.Data;

                //string directoryPath = @"/Users/akif/Downloads/resume";

                // Specify the file extensions you are interested in
                string[] allowedExtensions = { ".pdf", ".doc", ".docx" };

                // Get all files in the directory with specified extensions
                var files = GetFilesInDirectory(_extractFile.GetLocalFolderPath(), allowedExtensions);
                var HighExp = 0.0;

                int count = 0;

                foreach (var v in files)
                {
                    try
                    {
                        var response = ProcessCV(v);
                        var singleResumeResult = Newtonsoft.Json.JsonConvert.DeserializeObject<ResumeParserModel>(response);
                        if (singleResumeResult == null)
                            continue;
                        EvaluationModel evModel = new EvaluationModel()
                        {
                            ScreeningId = queuedProcess.Data.Id,
                            Name = singleResumeResult.name,
                            Email = singleResumeResult.email,
                            Location = v,
                            Experience = singleResumeResult.total_experience,
                            Skills = singleResumeResult.skills,
                            OrganizationId = jobReq.Data.OrganizationId,
                            Education = singleResumeResult.degree
                        };
                        if (singleResumeResult.total_experience > HighExp)
                        {
                            HighExp = singleResumeResult.total_experience;
                        }
                        resultParsers.Add(evModel);
                        count++;
                        progressPercentage = Math.Round(((96.0 / files.Length) * count), 2); ;
                    }
                    catch (Exception e)
                    {
                        continue;
                    }

                }

                var finalResult = getScore(resultParsers, workflow.Data, jobReq.Data, HighExp);
                var sortedFinalResult = finalResult.OrderByDescending(f => f.Match).ToList();
                if (sortedFinalResult.Count > 20)
                {
                    sortedFinalResult = sortedFinalResult.Take(20).ToList();
                }

                List<ResultRequestModel> requestModels = new List<ResultRequestModel>();
                foreach (var v in sortedFinalResult)
                {
                    ResultRequestModel model = new ResultRequestModel()
                    {
                        ScreeningId = queuedProcess.Data.Id,
                        Email = v.Email,
                        LocationPath = fileLinks.First(f=>f.Key.Trim() == ExtractFolderIdFromLink(v.Location).Trim()).Value,
                        Name = v.Name,
                        OrganizationId = jobReq.Data.OrganizationId,
                        Score = v.Match
                    };
                    requestModels.Add(model);
                }
                //var x = sortedFinalResult;
                _resultService.SaveListResult(requestModels);
                UpdateJobPostStatus(jobReq.Data, SettingConstants.SCREENING_FINISHED);

                progressPercentage = 100;
                queuedProcess.Data.Status = SettingConstants.REQUEST_COMPLETED;

                updateScreeningStatus(queuedProcess.Data, SettingConstants.REQUEST_COMPLETED);

                queuedProcess = await _screeningService.GetQueuedScreening();
                if (queuedProcess.Data == null)
                    break;
            }
            
        }
        catch (Exception e)
        {
            UpdateJobPostStatus(jobReq.Data, SettingConstants.SCREENING_OPEN);
            _screeningService.DeleteByJobPostId(queuedProcess.Data.JobPostId);

            isRunning = false;
        }

        isRunning = false;
    }

    private static string ExtractFolderIdFromLink(string sharedLink)
    {
        string[] segments = sharedLink.Split('/');
        // Assuming the folder ID is the second last segment in the URL
        return segments[segments.Length - 1];
    }

    private void updateScreeningStatus(ScreeningModel data, int rEQUEST_COMPLETED)
    {
        ScreeningRequestModel model = new ScreeningRequestModel() {
            Id = data.Id,
            JobPostId = data.JobPostId,
            WorkflowMasterId = data.WorkflowMasterId,
            LocationPath = data.LocationPath,
            Status = rEQUEST_COMPLETED,
            UserId = data.UserId
        };
        _screeningService.SaveScreening(model);
    }

    private string ProcessCV(string input)
    {
        var client = new HttpClient();
        client.BaseAddress = new Uri(_apiSettings.PythonApiBaseUrl);
        var requstModel = new CVInputPythonModel()
        {
            Directory = input
        };

        var json = Newtonsoft.Json.JsonConvert.SerializeObject(requstModel);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = client.PostAsync("get-cv-details", content).Result;

        if (response.IsSuccessStatusCode)
        {
            return response.Content.ReadAsStringAsync().Result;
        }

        return "";
    }

    private List<EvaluationModel> getScore(List<EvaluationModel> resumeResult, WorkflowResponseModel? workflowData, JobPostResponse? jobReqData, double highExp)
    {
        Dictionary<int, int> weightPercentage = new Dictionary<int, int>();
        var priorityWise = workflowData.WorkflowDetailResponseModel.OrderBy(o => o.Priority).ToList();
        if (workflowData.WorkflowDetailResponseModel.Count == 2)
        {
            weightPercentage.Add(priorityWise[0].WorkflowTypeId,75);
            weightPercentage.Add(priorityWise[1].WorkflowTypeId,25);
        }
        else if (workflowData.WorkflowDetailResponseModel.Count == 3)
        {
            weightPercentage.Add(priorityWise[0].WorkflowTypeId,50);
            weightPercentage.Add(priorityWise[1].WorkflowTypeId,35);
            weightPercentage.Add(priorityWise[2].WorkflowTypeId,15);
        }
        else if (workflowData.WorkflowDetailResponseModel.Count == 4)
        {
            weightPercentage.Add(priorityWise[0].WorkflowTypeId,40);
            weightPercentage.Add(priorityWise[1].WorkflowTypeId,30);
            weightPercentage.Add(priorityWise[2].WorkflowTypeId,20);
            weightPercentage.Add(priorityWise[3].WorkflowTypeId,10);
        }
        else
        {
            weightPercentage.Add(priorityWise[0].WorkflowTypeId,100);
        }
        
        var highScore = 0.0;
        var highEdu = 0.0;
        Dictionary<int, double> dictSkillScore = new Dictionary<int,double>();
        Dictionary<int, double> dictEduScore = new Dictionary<int,double>();

        foreach (var v in resumeResult.Select((x, i) => new { Value = x, Index = i }))
        {
            var score = 0.0;
            if(weightPercentage.ContainsKey(SettingConstants.WORKFLOW_EXPERIENCE) && v.Value.Experience>=jobReqData.MinExperience)
            {
                score += (weightPercentage[SettingConstants.WORKFLOW_EXPERIENCE] / (highExp*100)) * (v.Value.Experience * 100);
            }
            if(weightPercentage.ContainsKey(SettingConstants.WORKFLOW_SKILL))
            {
                if (v.Value.Skills == null)
                    v.Value.Skills = new string[0];
                var tmpScore = (weightPercentage[SettingConstants.WORKFLOW_SKILL] / jobReqData.Skills.Length) * jobReqData.Skills.Split(',').Intersect(v.Value.Skills, StringComparer.OrdinalIgnoreCase).Count();
                // score += (weightPercentage[SettingConstants.WORKFLOW_SKILL] / jobReqData.Skills.Length) * jobReqData.Skills.Split(',').Intersect(v.Skills, StringComparer.OrdinalIgnoreCase).Count();
                if (highScore < tmpScore)
                    highScore = tmpScore;
                dictSkillScore.Add(v.Index,tmpScore);
            }

            if (weightPercentage.ContainsKey(SettingConstants.WORKFLOW_EDUCATION))
            {
                if (v.Value.Education == null)
                    v.Value.Education = new string[0];
                var tmpEdu = (weightPercentage[SettingConstants.WORKFLOW_EDUCATION] * CalculateAverageSimilarityPercentage(jobReqData.Education,v.Value.Education)) / 100;
                // score += (weightPercentage[SettingConstants.WORKFLOW_EDUCATION] * CalculateAverageSimilarityPercentage(jobReqData.Education,v.Value.Education)) / 100;
                if (highEdu < tmpEdu)
                    highEdu = tmpEdu;
                dictEduScore.Add(v.Index,tmpEdu);
            }

            v.Value.Match = Math.Round(score, 2);

        }
        
        if (highScore>0 && dictSkillScore.Count > 0)
        {
            foreach (var v in resumeResult.Select((x, i) => new { Value = x, Index = i }))
            {
                v.Value.Match += Math.Round((dictSkillScore[v.Index] / highScore) *
                                            weightPercentage[SettingConstants.WORKFLOW_SKILL],1);
            }
        }

        if (highEdu>0 && dictEduScore.Count > 0)
        {
            foreach (var v in resumeResult.Select((x, i) => new { Value = x, Index = i }))
            {
                v.Value.Match += Math.Round((dictEduScore[v.Index] / highEdu) *
                                            weightPercentage[SettingConstants.WORKFLOW_SKILL],1);
            }
        }

        return resumeResult;
    }
    
    private double CalculateAverageSimilarityPercentage(string mainString, string[] stringArray)
    {
        if (stringArray.Length == 0)
        {
            // If the array is empty, consider them 0% similar
            return 0.0;
        }

        double totalSimilarityPercentage = 0.0;

        foreach (string str in stringArray)
        {
            double similarityPercentage = CalculateSimilarityPercentage(mainString, str);
            totalSimilarityPercentage += similarityPercentage;
        }

        // Calculate the average similarity percentage
        double averageSimilarityPercentage = totalSimilarityPercentage / stringArray.Length;

        return averageSimilarityPercentage;
    }
    private double CalculateSimilarityPercentage(string str1, string str2)
    {
        int maxLength = Math.Max(str1.Length, str2.Length);

        if (maxLength == 0)
        {
            // Both strings are empty, consider them 100% similar
            return 100.0;
        }

        int levenshteinDistance = CalculateLevenshteinDistance(str1, str2);

        // Calculate the similarity percentage
        double similarityPercentage = (1.0 - (double)levenshteinDistance / maxLength) * 100.0;

        return similarityPercentage;
    }
    private int CalculateLevenshteinDistance(string str1, string str2)
    {
        int[,] matrix = new int[str1.Length + 1, str2.Length + 1];

        for (int i = 0; i <= str1.Length; i++)
        {
            for (int j = 0; j <= str2.Length; j++)
            {
                if (i == 0)
                    matrix[i, j] = j;
                else if (j == 0)
                    matrix[i, j] = i;
                else
                    matrix[i, j] = Math.Min(Math.Min(matrix[i - 1, j] + 1, matrix[i, j - 1] + 1),
                        matrix[i - 1, j - 1] + (str1[i - 1] == str2[j - 1] ? 0 : 1));
            }
        }

        return matrix[str1.Length, str2.Length];
    }
    private string[] GetFilesInDirectory(string directoryPath, string[] allowedExtensions)
    {
        try
        {
            // Search for files with specified extensions in the directory
            var files = Directory.GetFiles(directoryPath, "*.*", SearchOption.AllDirectories)
                .Where(file => allowedExtensions.Any(ext => ext.Equals(Path.GetExtension(file), StringComparison.OrdinalIgnoreCase)))
                .ToArray();

            return files;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return new string[0]; // Return an empty array in case of an error
        }
    }
    private void UpdateJobPostStatus(JobPostResponse data, int status)
    {
        var requestModel = new JobPostRequestModel()
        {
            Id = data.Id,
            Title = data.Title,
            Description = data.Description,
            JobType = data.JobType,
            MinExperience = data.MinExperience,
            MaxExperience = data.MaxExperience,
            Location = data.Location,
            Education = data.Education,
            WorkPlace = data.WorkPlace,
            Skills = data.Skills,
            IsFav = data.IsFav,
            IsDeleted = data.IsDeleted,
            Status = status,
            OrganizationId = data.OrganizationId,
            ModifiedBy = data.CreatedBy
        };

        _jobPostService.SaveJobPost(requestModel);
    }
}
//
// public class BackgroundTaskService : IBackgroundTaskService
// {
//     private readonly ILogger<BackgroundTaskService> _logger;
//     private readonly object lockObject = new object();
//     private volatile bool isRunning = false;
//     private int progressPercentage = 0;
//
//     public BackgroundTaskService(ILogger<BackgroundTaskService> logger)
//     {
//         _logger = logger;
//     }
//     public async Task<int> GetProgressPercentage()
//     {
//         lock (lockObject)
//         {
//             if (!isRunning)
//             {
//                 return 0;
//             }
//
//             return progressPercentage;
//         }
//     }
//
//     public async Task StartBackgroundTask()
//     {
//         lock (lockObject)
//         {
//             if (isRunning)
//             {
//                 // Background task is already running
//                 return;
//             }
//
//             // Start the background task
//             isRunning = true;
//         }
//
//         while (progressPercentage < 100)
//         {
//             // Simulate background processing
//             await Task.Delay(1000);
//
//             lock (lockObject)
//             {
//                 progressPercentage += 1;
//                 _logger.LogInformation($"Execution started {progressPercentage} {isRunning}");
//             }
//         }
//
//         lock (lockObject)
//         {
//             isRunning = false;
//         }
//     }
// }