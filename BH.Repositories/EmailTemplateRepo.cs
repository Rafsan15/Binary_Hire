
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
    public class EmailTemplateRepo :BHConnectionBase, IEmailTemplateRepo
    {
        private readonly ILogger<EmailTemplateRepo> _logger;
        public EmailTemplateRepo(IDbConnectionFactory dbConnectionFactory, ILogger<EmailTemplateRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveEmailTemplate(EmailTemplateRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveEmailTemplate, Class: EmailTemplateRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@EmailTypeId", model.EmailTypeId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Subject", model.Subject, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Body", model.Body, DbType.String, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ModifiedBy", model.ModifiedBy, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveEmailTemplate", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveEmailTemplate, Class: EmailTemplateRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<EmailTemplateResponseModel>> GetEmailTemplateById(int id)
        {
            ResultModel<EmailTemplateResponseModel> resultModel = new ResultModel<EmailTemplateResponseModel>();
            _logger.LogInformation("Going to execute Method: SaveEmailTemplate, Class: EmailTemplateRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<EmailTemplateResponseModel>("SelectEmailTemplateById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetEmailTemplateById, Class: EmailTemplateRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetEmailTemplateById, Class: EmailTemplateRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<EmailTemplateResponseModel>>> GetAllEmailTemplate(EmailTemplateListModel model)
        {
            ResultModel<List<EmailTemplateResponseModel>> resultModel = new ResultModel<List<EmailTemplateResponseModel>>();
            resultModel.Data = new List<EmailTemplateResponseModel>();
            _logger.LogInformation("Going to execute Method: GetAllEmailTemplate, Class: EmailTemplateRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<EmailTemplateResponseModel>("SelectEmailTemplate", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllEmailTemplate, Class: EmailTemplateRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllEmailTemplate, Class: EmailTemplateRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllEmailTemplateCount(EmailTemplateListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllEmailTemplateCount, Class: EmailTemplateRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectEmailTemplate", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllEmailTemplateCount, Class: EmailTemplateRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllEmailTemplateCount, Class: EmailTemplateRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<SettingType>>?> GetAllEmailTemplateTypes()
        {
            ResultModel<List<SettingType>> resultModel = new ResultModel<List<SettingType>>();
            _logger.LogInformation("Going to execute Method: GetAllEmailTemplateTypes, Class: EmailTemplateRepo");
            try
            {
                var param = new DynamicParameters();

                resultModel.Data = (await Connection
                    .QueryAsync<SettingType>("SelectEmailTemplateTypes", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllEmailTemplateTypes, Class: EmailTemplateRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllEmailTemplateTypes, Class: EmailTemplateRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


