
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
    public class OrganizationRepo :BHConnectionBase, IOrganizationRepo
    {
        private readonly ILogger<OrganizationRepo> _logger;
        public OrganizationRepo(IDbConnectionFactory dbConnectionFactory, ILogger<OrganizationRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveOrganization(OrganizationModel model)
        {
            ResultModel<OrganizationModel> resultModel = new ResultModel<OrganizationModel>();
            _logger.LogInformation("Going to execute Method: SaveOrganization, Class: OrganizationRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Name", model.Name, DbType.String, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveOrganization", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveOrganization, Class: OrganizationRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<OrganizationModel>> GetOrganizationById(int id)
        {
            ResultModel<OrganizationModel> resultModel = new ResultModel<OrganizationModel>();
            _logger.LogInformation("Going to execute Method: SaveOrganization, Class: OrganizationRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<OrganizationModel>("SelectOrganizationById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetOrganizationById, Class: OrganizationRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetOrganizationById, Class: OrganizationRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<OrganizationModel>>> GetAllOrganization(OrganizationListModel model)
        {
            ResultModel<List<OrganizationModel>> resultModel = new ResultModel<List<OrganizationModel>>();
            _logger.LogInformation("Going to execute Method: GetAllOrganization, Class: OrganizationRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<OrganizationModel>("SelectOrganization", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllOrganization, Class: OrganizationRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllOrganization, Class: OrganizationRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllOrganizationCount(OrganizationListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllOrganizationCount, Class: OrganizationRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
                param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectOrganization", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllOrganizationCount, Class: OrganizationRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllOrganizationCount, Class: OrganizationRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


