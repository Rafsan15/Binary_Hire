using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Constants;
using BH.Services.Extensions;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class ResultService : IResultService
    {
        private readonly ILogger<ResultRepo> _logger;
        private readonly IResultRepo _repo;


        public ResultService(ILogger<ResultRepo> logger, IResultRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<ResultResponseModel>> SaveResult(ResultRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveResult, Class: ResultService");
            var result = await _repo.SaveResult(model);
            _logger.LogInformation("Execution completed Method: SaveResult, Class: ResultService");
            return await GetResultById(result);
        }

        public async Task<ResultModel<bool>> SaveListResult(List<ResultRequestModel> model)
        {
            ResultModel<bool> res = new ResultModel<bool>();
            _logger.LogInformation("Going to execute Method: SaveListResult, Class: ResultService");
            try
            {
                int result = await _repo.SaveListResult(model);
                res.Data = true;
                _logger.LogInformation("Execution completed Method: SaveListResult, Class: ResultService");
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred in Method: SaveResult, Class: ResultRepo, error :{ex.Message}");
                res.Message = "Something went wrong";
                res.IsSuccess = false;
                res.ErrorMessages = ex.Message.Split(Environment.NewLine);
                return res;
            }
        }

        public async Task<ResultModel<ResultResponseModel>> GetResultById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetResultById, Class: ResultService");
            var result = await _repo.GetResultById(id);
            _logger.LogInformation("Execution completed Method: GetResultById, Class: ResultService");
            return result;
        }

        public async Task<ResultModel<List<ResultModel>>> GetAllResult(ResultListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllResult, Class: ResultService");
            var result = await _repo.GetAllResult(model);
            _logger.LogInformation("Execution completed Method: GetAllResult, Class: ResultService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllResultCount(ResultListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllResultCount, Class: ResultService");
            var result = await _repo.GetAllResultCount(model);
            _logger.LogInformation("Execution completed Method: GetAllResultCount, Class: ResultService");
            return result;
        }

        public async Task<ResultModel<int>> GetWorkflowByJob(int id)
        {
            _logger.LogInformation("Going to execute Method: GetWorkflowByJob, Class: ResultService");
            var result = await _repo.GetWorkflowByJob(id);
            _logger.LogInformation("Execution completed Method: GetWorkflowByJob, Class: ResultService");
            return result;
        }
    }
}


