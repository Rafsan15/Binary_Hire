
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


namespace BH.Repositories
{
    public class ScreeningRepo :BHConnectionBase, IScreeningRepo
    {
        private readonly ILogger<ScreeningRepo> _logger;
        public ScreeningRepo(IDbConnectionFactory dbConnectionFactory, ILogger<ScreeningRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveScreening(ScreeningRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveScreening, Class: ScreeningRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@JobPostId", model.JobPostId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@WorkflowMasterId", model.WorkflowMasterId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@LocationPath", model.LocationPath, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Status", model.Status, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@UserId", model.UserId, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveScreening", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveScreening, Class: ScreeningRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<ScreeningModel>> GetScreeningById(int id)
        {
            ResultModel<ScreeningModel> resultModel = new ResultModel<ScreeningModel>();
            _logger.LogInformation("Going to execute Method: SaveScreening, Class: ScreeningRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<ScreeningModel>("SelectScreeningById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetScreeningById, Class: ScreeningRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetScreeningById, Class: ScreeningRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<ScreeningModel>>> GetAllScreening(ScreeningListModel model)
        {
            ResultModel<List<ScreeningModel>> resultModel = new ResultModel<List<ScreeningModel>>();
            _logger.LogInformation("Going to execute Method: GetAllScreening, Class: ScreeningRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    //param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<ScreeningModel>("SelectScreening", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllScreening, Class: ScreeningRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllScreening, Class: ScreeningRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllScreeningCount(ScreeningListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllScreeningCount, Class: ScreeningRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
			    //param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectScreening", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllScreeningCount, Class: ScreeningRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllScreeningCount, Class: ScreeningRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
        
        public async Task<ResultModel<ScreeningModel>> GetQueuedScreening()
        {
            ResultModel<ScreeningModel> resultModel = new ResultModel<ScreeningModel>();
            _logger.LogInformation("Going to execute Method: GetQueuedScreening, Class: ScreeningRepo");
            try
            {
                var param = new DynamicParameters();

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<ScreeningModel>("SelectQueuedScreening", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetQueuedScreening, Class: ScreeningRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetQueuedScreening, Class: ScreeningRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<ScreeningModel>> GetScreeningByJobId(int id)
        {
            ResultModel<ScreeningModel> resultModel = new ResultModel<ScreeningModel>();
            _logger.LogInformation("Going to execute Method: GetScreeningByJobId, Class: ScreeningRepo");
            try
            {
                var param = new DynamicParameters();

                param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<ScreeningModel>("SelectScreeningByJobId", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetScreeningByJobId, Class: ScreeningRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetScreeningByJobId, Class: ScreeningRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> DeleteByJobPostId(int id)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: DeleteByJobPostId, Class: ScreeningRepo");
            try
            {
                var param = new DynamicParameters();
                param.Add("@JobPostId", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .ExecuteScalarAsync<int>("DeleteScreeningByJobId", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: DeleteByJobPostId, Class: ScreeningRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: DeleteByJobPostId, Class: ScreeningRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


