
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IWorkflowMasterRepo
    {
        Task<int> SaveWorkflowMaster(WorkflowMasterDetailRequestModel model);
        Task<ResultModel<WorkflowResponseModel>> GetWorkflowMasterById(int id);
        Task<ResultModel<List<WorkflowMasterModel>>> GetAllWorkflowMaster(WorkflowMasterListModel model);
        Task<ResultModel<int>> GetAllWorkflowMasterCount(WorkflowMasterListModel model);
        Task<ResultModel<List<SettingType>>> GetAllWorkFlowTypes();
    }
 }



