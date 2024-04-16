
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
    public class QuestionRepo :BHConnectionBase, IQuestionRepo
    {
        private readonly ILogger<QuestionRepo> _logger;
        public QuestionRepo(IDbConnectionFactory dbConnectionFactory, ILogger<QuestionRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveQuestion(QuestionRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveQuestion, Class: QuestionRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@JobId", model.JobId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@QuestionText", model.QuestionText, DbType.String, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ModifiedBy", model.ModifiedBy, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveQuestion", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveQuestion, Class: QuestionRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<QuestionResponseModel>> GetQuestionById(int id)
        {
            ResultModel<QuestionResponseModel> resultModel = new ResultModel<QuestionResponseModel>();
            _logger.LogInformation("Going to execute Method: SaveQuestion, Class: QuestionRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<QuestionResponseModel>("SelectQuestionById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetQuestionById, Class: QuestionRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetQuestionById, Class: QuestionRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<QuestionResponseModel>>> GetAllQuestion(QuestionListModel model)
        {
            ResultModel<List<QuestionResponseModel>> resultModel = new ResultModel<List<QuestionResponseModel>>();
            _logger.LogInformation("Going to execute Method: GetAllQuestion, Class: QuestionRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<QuestionResponseModel>("SelectQuestion", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllQuestion, Class: QuestionRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllQuestion, Class: QuestionRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllQuestionCount(QuestionListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllQuestionCount, Class: QuestionRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectQuestion", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllQuestionCount, Class: QuestionRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllQuestionCount, Class: QuestionRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<bool>?> SaveListQuestion(QuestionRequestListSave question)
        {
            _logger.LogInformation("Going to execute Method: SaveListQuestion, Class: QuestionRepo");
            ResultModel<bool> resultModel = new ResultModel<bool>();
            try
            {
                var param = new DynamicParameters();

                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(question);
                param.Add("@JsonObject", jsonString, DbType.String, ParameterDirection.Input, null);

                var res = await Connection
                    .ExecuteScalarAsync<int>("SaveQuestionList", param, commandType: CommandType.StoredProcedure);

                resultModel.Data = true;
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: SaveListQuestion, Class: QuestionRepo");
                return resultModel;


            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveListQuestion, Class: QuestionRepo, error :{ex.Message}");
                resultModel.Data = false;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


