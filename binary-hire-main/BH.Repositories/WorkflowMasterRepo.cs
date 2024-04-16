
using System;
using Dapper;
using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories.Connections;
using BH.Repositories.Connections.Interface;
using BH.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Data;
using BH.Models.ResponseModels;


namespace BH.Repositories
{
    public class WorkflowMasterRepo :BHConnectionBase, IWorkflowMasterRepo
    {
        private readonly ILogger<WorkflowMasterRepo> _logger;
        public WorkflowMasterRepo(IDbConnectionFactory dbConnectionFactory, ILogger<WorkflowMasterRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveWorkflowMaster(WorkflowMasterDetailRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveWorkflowMaster, Class: WorkflowMasterRepo");

            try
            {
                var param = new DynamicParameters();
                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(model);
                param.Add("@JsonObject", jsonString, DbType.String, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveWorkflowMaster", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveWorkflowMaster, Class: WorkflowMasterRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<WorkflowResponseModel>> GetWorkflowMasterById(int id)
        {
            ResultModel<WorkflowResponseModel> resultModel = new ResultModel<WorkflowResponseModel>();
            resultModel.Data = new WorkflowResponseModel();
            _logger.LogInformation("Going to execute Method: SaveWorkflowMaster, Class: WorkflowMasterRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);
                using (var multi = await Connection.QueryMultipleAsync("SelectWorkflowMasterById", param, commandType: CommandType.StoredProcedure))
                {
                    resultModel.Data.WorkflowMaster = await multi.ReadFirstAsync<WorkflowMasterResponseModel>();
                    resultModel.Data.WorkflowDetailResponseModel = (await multi.ReadAsync<WorkflowDetailResponseModel>()).ToList();
                }
                
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetWorkflowMasterById, Class: WorkflowMasterRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetWorkflowMasterById, Class: WorkflowMasterRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<WorkflowMasterModel>>> GetAllWorkflowMaster(WorkflowMasterListModel model)
        {
            ResultModel<List<WorkflowMasterModel>> resultModel = new ResultModel<List<WorkflowMasterModel>>();
            _logger.LogInformation("Going to execute Method: GetAllWorkflowMaster, Class: WorkflowMasterRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<WorkflowMasterModel>("SelectWorkflowMaster", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllWorkflowMaster, Class: WorkflowMasterRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllWorkflowMaster, Class: WorkflowMasterRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllWorkflowMasterCount(WorkflowMasterListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllWorkflowMasterCount, Class: WorkflowMasterRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
                
                param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectWorkflowMaster", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllWorkflowMasterCount, Class: WorkflowMasterRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllWorkflowMasterCount, Class: WorkflowMasterRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<SettingType>>> GetAllWorkFlowTypes()
        {
            ResultModel<List<SettingType>> resultModel = new ResultModel<List<SettingType>>();
            _logger.LogInformation("Going to execute Method: GetAllWorkFlowTypes, Class: WorkflowMasterRepo");
            try
            {
                var param = new DynamicParameters();

                resultModel.Data = (await Connection
                    .QueryAsync<SettingType>("SelectWorkflowTypes", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllWorkFlowTypes, Class: WorkflowMasterRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllWorkFlowTypes, Class: WorkflowMasterRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


