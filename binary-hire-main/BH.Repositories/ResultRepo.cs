
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
    public class ResultRepo :BHConnectionBase, IResultRepo
    {
        private readonly ILogger<ResultRepo> _logger;
        public ResultRepo(IDbConnectionFactory dbConnectionFactory, ILogger<ResultRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveResult(ResultRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveResult, Class: ResultRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ScreeningId", model.ScreeningId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Name", model.Name, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Email", model.Email, DbType.String, ParameterDirection.Input, null);
			    param.Add("@LocationPath", model.LocationPath, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Score", model.Score, DbType.Double, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveResult", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveResult, Class: ResultRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<ResultResponseModel>> GetResultById(int id)
        {
            ResultModel<ResultResponseModel> resultModel = new ResultModel<ResultResponseModel>();
            _logger.LogInformation("Going to execute Method: SaveResult, Class: ResultRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<ResultResponseModel>("SelectResultById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetResultById, Class: ResultRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetResultById, Class: ResultRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<ResultModel>>> GetAllResult(ResultListModel model)
        {
            ResultModel<List<ResultModel>> resultModel = new ResultModel<List<ResultModel>>();
            _logger.LogInformation("Going to execute Method: GetAllResult, Class: ResultRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@JobPostId", model.JobPostId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<ResultModel>("SelectResult", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllResult, Class: ResultRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllResult, Class: ResultRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllResultCount(ResultListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllResultCount, Class: ResultRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
                param.Add("@JobPostId", model.JobPostId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectResult", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllResultCount, Class: ResultRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllResultCount, Class: ResultRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<int> SaveListResult(List<ResultRequestModel> model)
        {
            _logger.LogInformation("Going to execute Method: SaveListResult, Class: ResultRepo");
            try
            {

                _logger.LogInformation(string.Format($"database insert sp execution- Started for Result"));
                var param = new DynamicParameters();

                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(model);
                param.Add("@JsonObject", jsonString, DbType.String, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveListResult", param, commandType: CommandType.StoredProcedure);


            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveListResult, Class: ResultRepo, error :{ex.Message}");
                throw;
            }
        }

        public async Task<ResultModel<int>> GetWorkflowByJob(int id)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetWorkflowByJob, Class: ResultRepo");
            try
            {
                var param = new DynamicParameters();
                param.Add("@JobPostId", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<int>("SelectWorkflowByJob", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetWorkflowByJob, Class: ResultRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetWorkflowByJob, Class: ResultRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


