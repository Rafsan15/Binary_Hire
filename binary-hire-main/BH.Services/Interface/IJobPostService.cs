using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IJobPostService
    {
        Task<ResultModel<JobPostResponse>> SaveJobPost(JobPostRequestModel model);
        Task<ResultModel<JobPostResponse>> GetJobPostById(int id);
        Task<ResultModel<List<JobPostResponse>>> GetAllJobPost(JobPostListModel model);
        Task<ResultModel<int>> GetAllJobPostCount(JobPostListModel model);
        Task<ResultModel<List<SettingType>>> GetAllJobTypes();
        Task<ResultModel<List<SettingType>>> GetAllWorkPlaces();
        Task<ResultModel<JobPostResponse>> SaveJobByUrl(UrlInputModel url);
        Task<string[]> getAllSkills();
        Task<ResultModel<List<JobPostResponse>>> GetJobFavourites(JobFavModel jobFavModel);
        Task<ResultModel<JobPostResponse>> UpdateJobFavourite(UpdateJobFavModel jobFavModel);
        Task<string> GetCurrentRequestStatusById(int id);
        Task<ResultModel<bool>> DeletePost(JobPostDeleteModel ids);
        Task<ResultModel<bool>> SaveNote(NoteModel model);
    }
 }




