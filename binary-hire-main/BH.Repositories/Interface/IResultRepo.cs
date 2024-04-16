
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IResultRepo
    {
        Task<int> SaveResult(ResultRequestModel model);
        Task<ResultModel<ResultResponseModel>> GetResultById(int id);
        Task<ResultModel<List<ResultModel>>> GetAllResult(ResultListModel model);
        Task<ResultModel<int>> GetAllResultCount(ResultListModel model);
        Task<int> SaveListResult(List<ResultRequestModel> model);
        Task<ResultModel<int>> GetWorkflowByJob(int id);
    }
 }



