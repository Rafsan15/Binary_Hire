using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class WorkflowMasterService : IWorkflowMasterService
    {
        private readonly ILogger<WorkflowMasterRepo> _logger;
        private readonly IWorkflowMasterRepo _repo;
        public WorkflowMasterService(ILogger<WorkflowMasterRepo> logger, IWorkflowMasterRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<WorkflowResponseModel>> SaveWorkflowMaster(WorkflowMasterDetailRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveWorkflowMaster, Class: WorkflowMasterService");
            var result = await _repo.SaveWorkflowMaster(model);
            _logger.LogInformation("Execution completed Method: SaveWorkflowMaster, Class: WorkflowMasterService");
            return await GetWorkflowMasterById(result);
        }

        public async Task<ResultModel<WorkflowResponseModel>> GetWorkflowMasterById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetWorkflowMasterById, Class: WorkflowMasterService");
            var result = await _repo.GetWorkflowMasterById(id);
            _logger.LogInformation("Execution completed Method: GetWorkflowMasterById, Class: WorkflowMasterService");
            return result;
        }

        public async Task<ResultModel<List<WorkflowMasterModel>>> GetAllWorkflowMaster(WorkflowMasterListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllWorkflowMaster, Class: WorkflowMasterService");
            var result = await _repo.GetAllWorkflowMaster(model);
            _logger.LogInformation("Execution completed Method: GetAllWorkflowMaster, Class: WorkflowMasterService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllWorkflowMasterCount(WorkflowMasterListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllWorkflowMasterCount, Class: WorkflowMasterService");
            var result = await _repo.GetAllWorkflowMasterCount(model);
            _logger.LogInformation("Execution completed Method: GetAllWorkflowMasterCount, Class: WorkflowMasterService");
            return result;
        }

        public async Task<ResultModel<List<SettingType>>> GetAllWorkFlowTypes()
        {
            _logger.LogInformation("Going to execute Method: GetAllWorkFlowTypes, Class: WorkflowMasterService");
            var result = await _repo.GetAllWorkFlowTypes();
            _logger.LogInformation("Execution completed Method: GetAllWorkFlowTypes, Class: WorkflowMasterService");
            return result;
        }
    }
}


