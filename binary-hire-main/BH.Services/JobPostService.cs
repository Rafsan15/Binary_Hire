using System.Text;
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Constants;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BH.Services
{
    public class JobPostService : IJobPostService
    {
        private readonly ILogger<JobPostRepo> _logger;
        private readonly IJobPostRepo _repo;
        private readonly IScreeningService _screeningService;
        private readonly APISettings _apiSettings;
        public JobPostService(ILogger<JobPostRepo> logger, IJobPostRepo repo, IScreeningService screeningService, IOptions<APISettings> apiSettings)
        {
            _logger = logger;
            _repo = repo;
            _screeningService = screeningService;
            _apiSettings = apiSettings.Value;
        }

        public async Task<ResultModel<JobPostResponse>> SaveJobPost(JobPostRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveJobPost, Class: JobPostService");
            var result = await _repo.SaveJobPost(model);
            _logger.LogInformation("Execution completed Method: SaveJobPost, Class: JobPostService");
            return await GetJobPostById(result);
        }

        public async Task<ResultModel<JobPostResponse>> GetJobPostById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetJobPostById, Class: JobPostService");
            var result = await _repo.GetJobPostById(id);
            _logger.LogInformation("Execution completed Method: GetJobPostById, Class: JobPostService");
            return result;
        }

        public async Task<ResultModel<List<JobPostResponse>>> GetAllJobPost(JobPostListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllJobPost, Class: JobPostService");
            var result = await _repo.GetAllJobPost(model);
            _logger.LogInformation("Execution completed Method: GetAllJobPost, Class: JobPostService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllJobPostCount(JobPostListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllJobPostCount, Class: JobPostService");
            var result = await _repo.GetAllJobPostCount(model);
            _logger.LogInformation("Execution completed Method: GetAllJobPostCount, Class: JobPostService");
            return result;
        }

        public async Task<ResultModel<List<SettingType>>> GetAllJobTypes()
        {
            _logger.LogInformation("Going to execute Method: GetAllJobTypes, Class: JobPostService");
            var result = await _repo.GetAllJobTypes();
            _logger.LogInformation("Execution completed Method: GetAllJobTypes, Class: JobPostService");
            return result;
        }

        public async Task<ResultModel<List<SettingType>>> GetAllWorkPlaces()
        {
            _logger.LogInformation("Going to execute Method: GetAllWorkPlaces, Class: JobPostService");
            var result = await _repo.GetAllWorkPlaces();
            _logger.LogInformation("Execution completed Method: GetAllWorkPlaces, Class: JobPostService");
            return result;
        }
        private string ProcessPost(string input)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(_apiSettings.PythonApiBaseUrl);
            var requstModel = new JobRequestPythonModel()
            {
                url = input
            };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(requstModel);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = client.PostAsync("get-job-details", content).Result;

            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsStringAsync().Result;
            }

            return "";
        } 

        public async Task<ResultModel<JobPostResponse>> SaveJobByUrl(UrlInputModel urlInputModel)
        {
            _logger.LogInformation("Going to execute Method: SaveJobByUrl, Class: JobPostService");
            ResultModel<JobPostResponse> result = new ResultModel<JobPostResponse>();
            try
            {
                var json = ProcessPost(urlInputModel.Url);
                var jobPostScriptModel = Newtonsoft.Json.JsonConvert.DeserializeObject<JobPostScriptModel>(json);
                if (jobPostScriptModel == null)
                {
                    return null;
                }
                var jobTypes = await GetAllJobTypes();
                var requestModel = new JobPostRequestModel()
                {
                    Title = jobPostScriptModel.Title,
                    Description = jobPostScriptModel.Description,
                    Education = jobPostScriptModel.Qualification,
                    IsDeleted = false,
                    IsFav = false,
                    Location = jobPostScriptModel.JobLocation,
                    MaxExperience = jobPostScriptModel.MaxExperience,
                    MinExperience = jobPostScriptModel.MinExperience,
                    JobType = jobTypes.Data.FirstOrDefault(j=>j.Name.ToLower().Equals(jobPostScriptModel.EmploymentStatus.ToLower()))?.Id,
                    Skills = string.Join(",",jobPostScriptModel.Skills),
                    WorkPlace = SettingConstants.ON_SITE,
                    Status = SettingConstants.SCREENING_OPEN,
                    OrganizationId = urlInputModel.OrganizationId,
                    ModifiedBy = urlInputModel.ModifiedBy
                };
                result = await SaveJobPost(requestModel);
                _logger.LogInformation("Execution completed Method: SaveJobByUrl, Class: JobPostService");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveJobByUrl, Class: JobPostService, error :{ex.Message}");
                result.Message = "Something went wrong";
                result.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return result;
            }
        }

        public async Task<string[]> getAllSkills()
        {
            return await Task.FromResult(SkillConstants.skills.Split(','));
        }

        public async Task<ResultModel<List<JobPostResponse>>> GetJobFavourites(JobFavModel jobFavModel)
        {
            _logger.LogInformation("Going to execute Method: GetJobFavourites, Class: JobPostService");
            var result = await _repo.GetJobFavourites(jobFavModel);
            _logger.LogInformation("Execution completed Method: GetJobFavourites, Class: JobPostService");
            return result;
        }

        public async Task<ResultModel<JobPostResponse>> UpdateJobFavourite(UpdateJobFavModel jobFavModel)
        {
            _logger.LogInformation("Going to execute Method: UpdateJobFavourite, Class: JobPostService");
            var result = await _repo.UpdateJobFavourite(jobFavModel);
            _logger.LogInformation("Execution completed Method: UpdateJobFavourite, Class: JobPostService");
            return await GetJobPostById(result);
        }

        public async Task<string> GetCurrentRequestStatusById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetCurrentRequestStatusById, Class: JobPostService");
            var result = await _screeningService.GetScreeningByJobId(id);
            _logger.LogInformation("Execution completed Method: GetCurrentRequestStatusById, Class: JobPostService");
            if (result.Data != null)
            {
                if (result.Data.Status == SettingConstants.REQUEST_QUEUED)
                {
                    return "Queued";
                }
                else if(result.Data.Status == SettingConstants.REQUEST_IN_PROGRESS)
                {
                    return "In Progress";
                }
                else
                {
                    return "Completed";
                }
            }
            return "";
        }

        public async Task<ResultModel<bool>> DeletePost(JobPostDeleteModel ids)
        {
            _logger.LogInformation("Going to execute Method: DeletePost, Class: JobPostService");
            var result = await _repo.DeletePost(ids);
            _logger.LogInformation("Execution completed Method: DeletePost, Class: JobPostService");
            return result;
        }

        public async Task<ResultModel<bool>> SaveNote(NoteModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveNote, Class: JobPostService");
            var result = await _repo.SaveNote(model);
            _logger.LogInformation("Execution completed Method: SaveNote, Class: JobPostService");
            return result;
        }
    }
}


