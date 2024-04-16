using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IResultService
    {
        Task<ResultModel<ResultResponseModel>> SaveResult(ResultRequestModel model);
        Task<ResultModel<bool>> SaveListResult(List<ResultRequestModel> model);
        Task<ResultModel<ResultResponseModel>> GetResultById(int id);
        Task<ResultModel<List<ResultModel>>> GetAllResult(ResultListModel model);
        Task<ResultModel<int>> GetAllResultCount(ResultListModel model);
        Task<ResultModel<int>> GetWorkflowByJob(int id);
    }
 }




