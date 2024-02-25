using BH.Models;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IScreeningService
    {
        Task<ResultModel<ScreeningModel>> SaveScreening(ScreeningRequestModel model);
        Task<ResultModel<ScreeningModel>> GetScreeningById(int id);
        Task<ResultModel<List<ScreeningModel>>> GetAllScreening(ScreeningListModel model);
        Task<ResultModel<int>> GetAllScreeningCount(ScreeningListModel model);
        Task<ResultModel<ScreeningModel>> GetQueuedScreening();
        Task<ResultModel<ScreeningModel>> GetScreeningByJobId(int id);
        Task<ResultModel<int>> DeleteByJobPostId(int id);
    }
 }




