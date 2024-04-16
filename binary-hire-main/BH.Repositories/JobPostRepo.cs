
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
    public class JobPostRepo :BHConnectionBase, IJobPostRepo
    {
        private readonly ILogger<JobPostRepo> _logger;
        public JobPostRepo(IDbConnectionFactory dbConnectionFactory, ILogger<JobPostRepo> logger)
            :base(dbConnectionFactory)
        {
            _logger = logger;
        }

        public async Task<int> SaveJobPost(JobPostRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveJobPost, Class: JobPostRepo");

            try
            {
                var param = new DynamicParameters();
			    param.Add("@Id", model.Id, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Title", model.Title, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Description", model.Description, DbType.String, ParameterDirection.Input, null);
			    param.Add("@JobType", model.JobType, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@MinExperience", model.MinExperience, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@MaxExperience", model.MaxExperience, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@Location", model.Location, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Education", model.Education, DbType.String, ParameterDirection.Input, null);
			    param.Add("@Skills", model.Skills, DbType.String, ParameterDirection.Input, null);
			    param.Add("@WorkPlace", model.WorkPlace, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@IsFav", model.IsFav, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@IsDeleted", model.IsDeleted, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@Status", model.Status, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@ModifiedBy", model.ModifiedBy, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("SaveJobPost", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveJobPost, Class: JobPostRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<JobPostResponse>> GetJobPostById(int id)
        {
            ResultModel<JobPostResponse> resultModel = new ResultModel<JobPostResponse>();
            _logger.LogInformation("Going to execute Method: SaveJobPost, Class: JobPostRepo");
            try
            {
                var param = new DynamicParameters();

			    param.Add("@Id", id, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstOrDefaultAsync<JobPostResponse>("SelectJobPostById", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetJobPostById, Class: JobPostRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetJobPostById, Class: JobPostRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<JobPostResponse>>> GetAllJobPost(JobPostListModel model)
        {
            ResultModel<List<JobPostResponse>> resultModel = new ResultModel<List<JobPostResponse>>();
            _logger.LogInformation("Going to execute Method: GetAllJobPost, Class: JobPostRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@Page", model.Page, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@PageSize", model.PageSize, DbType.Int32, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<JobPostResponse>("SelectJobPost", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllJobPost, Class: JobPostRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllJobPost, Class: JobPostRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<int>> GetAllJobPostCount(JobPostListModel model)
        {
            ResultModel<int> resultModel = new ResultModel<int>();
            _logger.LogInformation("Going to execute Method: GetAllJobPostCount, Class: JobPostRepo");
            try
            {
                var param = new DynamicParameters();
			    param.Add("@IsCountCalled", true, DbType.Boolean, ParameterDirection.Input, null);
			    param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);
                var sqlWhereClause = model.GetSearchFilterClause();
			    param.Add("@SqlWhereClause", sqlWhereClause, DbType.String, ParameterDirection.Input, null);

                resultModel.Data = await Connection
                    .QueryFirstAsync<int>("SelectJobPost", param, commandType: CommandType.StoredProcedure);
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllJobPostCount, Class: JobPostRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllJobPostCount, Class: JobPostRepo, error :{ex.Message}");
                resultModel.Data = -1;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<SettingType>>> GetAllJobTypes()
        {
            ResultModel<List<SettingType>> resultModel = new ResultModel<List<SettingType>>();
            _logger.LogInformation("Going to execute Method: GetAllJobTypes, Class: JobPostRepo");
            try
            {
                var param = new DynamicParameters();

                resultModel.Data = (await Connection
                    .QueryAsync<SettingType>("SelectJobTypes", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllJobTypes, Class: JobPostRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllJobTypes, Class: JobPostRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<SettingType>>> GetAllWorkPlaces()
        {
            ResultModel<List<SettingType>> resultModel = new ResultModel<List<SettingType>>();
            _logger.LogInformation("Going to execute Method: GetAllWorkPlaces, Class: JobPostRepo");
            try
            {
                var param = new DynamicParameters();

                resultModel.Data = (await Connection
                    .QueryAsync<SettingType>("SelectWorkplaces", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetAllWorkPlaces, Class: JobPostRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetAllWorkPlaces, Class: JobPostRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<ResultModel<List<JobPostResponse>>> GetJobFavourites(JobFavModel model)
        {
            ResultModel<List<JobPostResponse>> resultModel = new ResultModel<List<JobPostResponse>>();
            _logger.LogInformation("Going to execute Method: GetJobFavourites, Class: JobPostRepo");
            try
            {
                var param = new DynamicParameters();
                param.Add("@OrganizationId", model.OrganizationId, DbType.Int32, ParameterDirection.Input, null);

                resultModel.Data = (await Connection
                    .QueryAsync<JobPostResponse>("SelectFavJobPost", param, commandType: CommandType.StoredProcedure)).ToList();
                resultModel.Message = "Executed successfully";
                resultModel.IsSuccess = true;
                _logger.LogInformation("Execution completed Method: GetJobFavourites, Class: JobPostRepo");
                return resultModel;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: GetJobFavourites, Class: JobPostRepo, error :{ex.Message}");
                resultModel.Data = null;
                resultModel.Message = "Something went wrong";
                resultModel.IsSuccess = false;
                resultModel.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return resultModel;
            }
        }

        public async Task<int> UpdateJobFavourite(UpdateJobFavModel model)
        {
            _logger.LogInformation("Going to execute Method: UpdateJobFavourite, Class: JobPostRepo");

            try
            {
                var param = new DynamicParameters();
                param.Add("@Id", model.JobId, DbType.Int32, ParameterDirection.Input, null);
                param.Add("@IsFav", model.IsFav, DbType.Boolean, ParameterDirection.Input, null);
                param.Add("@ModifiedBy", model.ModifiedBy, DbType.Int32, ParameterDirection.Input, null);

                return await Connection
                    .ExecuteScalarAsync<int>("UpdateJobFavourite", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: UpdateJobFavourite, Class: JobPostRepo, error :{ex.Message}");
                return -1;
            }
        }

        public async Task<ResultModel<bool>> DeletePost(JobPostDeleteModel ids)
        {
            _logger.LogInformation("Going to execute Method: DeletePost, Class: JobPostRepo");
            ResultModel<bool> result = new ResultModel<bool>();
            try
            {
                var param = new DynamicParameters();
                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(ids);
                param.Add("@JsonObject", jsonString, DbType.String, ParameterDirection.Input, null);

                var response =  await Connection
                    .ExecuteScalarAsync<int>("DeleteJobPost", param, commandType: CommandType.StoredProcedure);
                if (response == 0)
                {
                    result.IsSuccess = true;
                    result.Data = true;
                    result.Message = "Job posts are deleted successfully";
                }
                else
                {
                    result.Message = "Something went wrong";
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: DeletePost, Class: JobPostRepo, error :{ex.Message}");
                result.Message = "Something went wrong";
            }
            return result;
        }

        public async Task<ResultModel<bool>> SaveNote(NoteModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveNote, Class: JobPostRepo");
            ResultModel<bool> result = new ResultModel<bool>();
            try
            {
                var param = new DynamicParameters();
                
                param.Add("@JobPostId", model.JobPostId, DbType.Int32, ParameterDirection.Input, null);
                param.Add("@Note", model.Note, DbType.String, ParameterDirection.Input, null);

                var response =  await Connection
                    .ExecuteScalarAsync<int>("SaveJobNotes", param, commandType: CommandType.StoredProcedure);
                if (response == 0)
                {
                    result.IsSuccess = true;
                    result.Data = true;
                    result.Message = "Notes are saved successfully";
                }
                else
                {
                    result.Message = "Something went wrong";
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveNote, Class: JobPostRepo, error :{ex.Message}");
                result.Message = "Something went wrong";
            }
            return result;
        }
    }
}


