
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IJobPostRepo
    {
        Task<int> SaveJobPost(JobPostRequestModel model);
        Task<ResultModel<JobPostResponse>> GetJobPostById(int id);
        Task<ResultModel<List<JobPostResponse>>> GetAllJobPost(JobPostListModel model);
        Task<ResultModel<int>> GetAllJobPostCount(JobPostListModel model);
        Task<ResultModel<List<SettingType>>> GetAllJobTypes();
        Task<ResultModel<List<SettingType>>> GetAllWorkPlaces();
        Task<ResultModel<List<JobPostResponse>>> GetJobFavourites(JobFavModel jobFavModel);
        Task<int> UpdateJobFavourite(UpdateJobFavModel model);
        Task<ResultModel<bool>> DeletePost(JobPostDeleteModel ids);
        Task<ResultModel<bool>> SaveNote(NoteModel model);
    }
 }



