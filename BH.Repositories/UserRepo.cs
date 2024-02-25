
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
using BH.Repositories.Constants;
using BH.Models.ResponseModels;

namespace BH.Repositories
{
    public class UserRepo :BHConnectionBase, IUserRepo
    {
        private readonly ILogger<UserRepo> _logger;
        public UserRepo(IDbConnectionFactory dbConnectionFactory, ILogger<UserRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveUser(UserModel model)
        {
            ResultModel<UserModel> resultModel = new ResultModel<UserModel>();
            _logger.LogInformation("Going to execute Method: SaveUser, Class: UserRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@UserName", model.UserName, DbType.String, ParameterDirection.Input, null);
			    param.Add("@FirstName", model.FirstName, DbType.String, ParameterDirection.Input, null);
			    param.Add("@LastName", model.LastName, DbType.String, ParameterDirection.Input, null);
			    param.Add("@AspnetUserId", model.AspnetUserId, DbType.String, ParameterDirection.Input, null);
			    param.Add("@UserTypeId", model.UserTypeId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Email", model.Email, DbType.String, ParameterDirection.Input, null);
			    param.Add("@PhoneNumber", model.PhoneNumber, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Active", model.Active, DbType.Boolean, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>(SPDBConstants.SAVE_USER, param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveUser, Class: UserRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<UserModel>> GetUserById(int id)
        {
            ResultModel<UserModel> resultModel = new ResultModel<UserModel>();
            _logger.LogInformation("Going to execute Method: SaveUser, Class: UserRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<UserModel>(SPDBConstants.SELECT_USER_BY_ID, param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetUserById, Class: UserRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetUserById, Class: UserRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<UserResponse>>> GetAllUser(UserListModel model)
        {
            ResultModel<List<UserResponse>> resultModel = new ResultModel<List<UserResponse>>();
            _logger.LogInformation("Going to execute Method: GetAllUser, Class: UserRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<UserResponse>(SPDBConstants.SELECT_USER, param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllUser, Class: UserRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllUser, Class: UserRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllUserCount(UserListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllUserCount, Class: UserRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
                param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>(SPDBConstants.SELECT_USER, param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllUserCount, Class: UserRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllUserCount, Class: UserRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<bool>> IsUserNameUnique(string? userName)
        {
            ResultModel<bool> resultModel = new ResultModel<bool>();
            _logger.LogInformation("Going to execute Method: IsUserNameUnique, Class: UserRepo");
            try
            {
                var param = new DynamicParameters();
                param.Add("@UserName", userName, DbType.String, ParameterDirection.Input, null);
                
                resultModel.Data = await Connection.ExecuteScalarAsync<bool>(SPDBConstants.IS_UNIQUE_USER, param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: IsUserNameUnique, Class: UserRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: IsUserNameUnique, Class: UserRepo, error :{ex.Message}");
                resultModel.Data = false;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<UserModel>> GetUserByEmail(string identityUserEmail)
        {
            ResultModel<UserModel> resultModel = new ResultModel<UserModel>();
            _logger.LogInformation("Going to execute Method: GetUserByEmail, Class: UserRepo");
            try
            {
                var param = new DynamicParameters();

                param.Add("@Email", identityUserEmail, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<UserModel>(SPDBConstants.SELECT_USER_BY_EMAIL, param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetUserByEmail, Class: UserRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetUserByEmail, Class: UserRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<UserRoleModel>> GetRoleById(int dataId)
        {
            ResultModel<UserRoleModel> resultModel = new ResultModel<UserRoleModel>();
            _logger.LogInformation("Going to execute Method: GetRoleById, Class: UserRepo");
            try
            {
                var param = new DynamicParameters();

                param.Add("@Id", dataId, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<UserRoleModel>(SPDBConstants.SELECT_ROLE_BY_USER_ID, param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetRoleById, Class: UserRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetRoleById, Class: UserRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


