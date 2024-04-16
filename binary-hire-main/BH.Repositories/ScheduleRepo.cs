
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
    public class ScheduleRepo :BHConnectionBase, IScheduleRepo
    {
        private readonly ILogger<ScheduleRepo> _logger;
        public ScheduleRepo(IDbConnectionFactory dbConnectionFactory, ILogger<ScheduleRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveSchedule(ScheduleRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveSchedule, Class: ScheduleRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int64, ParameterDirection.Input, null);
			    param.Add("@JobPostId", model.JobPostId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ResultId", model.ResultId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OnDate", model.OnDate, DbType.Date, ParameterDirection.Input, null);
			    param.Add("@StartTime", model.StartTime, DbType.DateTime, ParameterDirection.Input, null);
			    param.Add("@EndTime", model.EndTime, DbType.DateTime, ParameterDirection.Input, null);
			    param.Add("@ModifiedBy", model.ModifiedBy, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveSchedule", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveSchedule, Class: ScheduleRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<ScheduleResponseModel>> GetScheduleById(int id)
        {
            ResultModel<ScheduleResponseModel> resultModel = new ResultModel<ScheduleResponseModel>();
            _logger.LogInformation("Going to execute Method: SaveSchedule, Class: ScheduleRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<ScheduleResponseModel>("SelectScheduleById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetScheduleById, Class: ScheduleRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetScheduleById, Class: ScheduleRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<ScheduleResponseModel>>> GetAllSchedule(ScheduleListModel model)
        {
            ResultModel<List<ScheduleResponseModel>> resultModel = new ResultModel<List<ScheduleResponseModel>>();
            _logger.LogInformation("Going to execute Method: GetAllSchedule, Class: ScheduleRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<ScheduleResponseModel>("SelectSchedule", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllSchedule, Class: ScheduleRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllSchedule, Class: ScheduleRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllScheduleCount(ScheduleListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllScheduleCount, Class: ScheduleRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectSchedule", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllScheduleCount, Class: ScheduleRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllScheduleCount, Class: ScheduleRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<bool>> DeleteScheduleById(int id)
        {
            ResultModel<bool> resultModel = new ResultModel<bool>();
            _logger.LogInformation("Going to execute Method: SaveSchedule, Class: ScheduleRepo");
            try
            {
                var param = new DynamicParameters();

                param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                var res = await Connection
                    .ExecuteScalarAsync<int>("DeleteScheduleById", param, commandType: CommandType.StoredProcedure);
                resultModel.Data = true;
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetScheduleById, Class: ScheduleRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetScheduleById, Class: ScheduleRepo, error :{ex.Message}");
                resultModel.Data = false;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }
    }
}


