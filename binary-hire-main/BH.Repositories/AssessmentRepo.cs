
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
    public class AssessmentRepo :BHConnectionBase, IAssessmentRepo
    {
        private readonly ILogger<AssessmentRepo> _logger;
        public AssessmentRepo(IDbConnectionFactory dbConnectionFactory, ILogger<AssessmentRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveAssessment(AssessmentRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveAssessment, Class: AssessmentRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ResultId", model.ResultId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@QuestionId", model.QuestionId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Score", model.Score, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ModifiedBy", model.ModifiedBy, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveAssessment", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveAssessment, Class: AssessmentRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<AssessmentResponseModel>> GetAssessmentById(int id)
        {
            ResultModel<AssessmentResponseModel> resultModel = new ResultModel<AssessmentResponseModel>();
            _logger.LogInformation("Going to execute Method: SaveAssessment, Class: AssessmentRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<AssessmentResponseModel>("SelectAssessmentById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAssessmentById, Class: AssessmentRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAssessmentById, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<AssessmentResponseModel>>> GetAllAssessment(AssessmentListModel model)
        {
            ResultModel<List<AssessmentResponseModel>> resultModel = new ResultModel<List<AssessmentResponseModel>>();
            _logger.LogInformation("Going to execute Method: GetAllAssessment, Class: AssessmentRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<AssessmentResponseModel>("SelectAssessment", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllAssessment, Class: AssessmentRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllAssessment, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllAssessmentCount(AssessmentListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllAssessmentCount, Class: AssessmentRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectAssessment", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllAssessmentCount, Class: AssessmentRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllAssessmentCount, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<bool>> SaveListAssessment(AssessmentRequestListSave assessment)
        {
            _logger.LogInformation("Going to execute Method: SaveListAssessment, Class: AssessmentRepo");
            ResultModel<bool> resultModel = new ResultModel<bool>();
            try
            {
                var param = new DynamicParameters();

                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(assessment);
                param.Add("@JsonObject", jsonString, DbType.String, ParameterDirection.Input, null);

                var res = await Connection
                    .ExecuteScalarAsync<int>("SaveAssessmentList", param, commandType: CommandType.StoredProcedure);

                resultModel.Data = true;
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: SaveListAssessment, Class: AssessmentRepo");
                return resultModel;


            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveListAssessment, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = false;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<bool>> IsAssessmentDone(int id)
        {
            _logger.LogInformation("Going to execute Method: IsAssessmentDone, Class: AssessmentRepo");
            ResultModel<bool> resultModel = new ResultModel<bool>();
            try
            {
                var param = new DynamicParameters();

                param.Add("@ResultId", id, DbType.Int16, ParameterDirection.Input, null);

                var res = await Connection
                    .ExecuteScalarAsync<int>("IsAssessmentDone", param, commandType: CommandType.StoredProcedure);
                if (res > 0)
                {
                    resultModel.Data = true;
                    resultModel.Message = "Assessment is done";
                    resultModel.IsSuccess = true;
                }
                else
                {
                    resultModel.Data = false;
                    resultModel.Message = "Assessment is not done yet";
                    resultModel.IsSuccess = true;
                }

               
                _logger.LogInformation("Execution completed Method: IsAssessmentDone, Class: AssessmentRepo");
                return resultModel;


            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: IsAssessmentDone, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = false;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<AssessmentSummeryModel>>> GetAssessmentSummery(AssessmentSummeryRequestModel model)
        {
            ResultModel<List<AssessmentSummeryModel>> resultModel = new ResultModel<List<AssessmentSummeryModel>>();
            _logger.LogInformation("Going to execute Method: GetAssessmentSummery, Class: AssessmentRepo");
            try
            {
                var param = new DynamicParameters();
                param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
                param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
                param.Add("@JobId", model.JobId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
                param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<AssessmentSummeryModel>("SelectAssessmentSummery", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAssessmentSummery, Class: AssessmentRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAssessmentSummery, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAssessmentSummeryCount(AssessmentSummeryRequestModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAssessmentSummeryCount, Class: AssessmentRepo");
            try
            {
                var param = new DynamicParameters();
                param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
                param.Add("@JobId", model.JobId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
                param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectAssessmentSummery", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAssessmentSummeryCount, Class: AssessmentRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAssessmentSummeryCount, Class: AssessmentRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


