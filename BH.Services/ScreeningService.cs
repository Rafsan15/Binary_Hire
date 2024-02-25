using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class ScreeningService : IScreeningService
    {
        private readonly ILogger<ScreeningRepo> _logger;
        private readonly IScreeningRepo _repo;
        public ScreeningService(ILogger<ScreeningRepo> logger, IScreeningRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<ScreeningModel>> SaveScreening(ScreeningRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveScreening, Class: ScreeningService");
            var result = await _repo.SaveScreening(model);
            _logger.LogInformation("Execution completed Method: SaveScreening, Class: ScreeningService");
            return await GetScreeningById(result);
        }

        public async Task<ResultModel<ScreeningModel>> GetScreeningById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetScreeningById, Class: ScreeningService");
            var result = await _repo.GetScreeningById(id);
            _logger.LogInformation("Execution completed Method: GetScreeningById, Class: ScreeningService");
            return result;
        }

        public async Task<ResultModel<List<ScreeningModel>>> GetAllScreening(ScreeningListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllScreening, Class: ScreeningService");
            var result = await _repo.GetAllScreening(model);
            _logger.LogInformation("Execution completed Method: GetAllScreening, Class: ScreeningService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllScreeningCount(ScreeningListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllScreeningCount, Class: ScreeningService");
            var result = await _repo.GetAllScreeningCount(model);
            _logger.LogInformation("Execution completed Method: GetAllScreeningCount, Class: ScreeningService");
            return result;
        }

        public async Task<ResultModel<ScreeningModel>> GetQueuedScreening()
        {
            _logger.LogInformation("Going to execute Method: GetQueuedScreening, Class: ScreeningService");
            var result = await _repo.GetQueuedScreening();
            _logger.LogInformation("Execution completed Method: GetQueuedScreening, Class: ScreeningService");
            return result;
        }

        public async Task<ResultModel<ScreeningModel>> GetScreeningByJobId(int id)
        {
            _logger.LogInformation("Going to execute Method: GetScreeningByJobId, Class: ScreeningService");
            var result = await _repo.GetScreeningByJobId(id);
            _logger.LogInformation("Execution completed Method: GetScreeningByJobId, Class: ScreeningService");
            return result;
        }
        public async Task<ResultModel<int>> DeleteByJobPostId(int id)
        {
            _logger.LogInformation("Going to execute Method: DeleteByJobPostId, Class: ScreeningService");
            var result = await _repo.DeleteByJobPostId(id);
            _logger.LogInformation("Execution completed Method: DeleteByJobPostId, Class: ScreeningService");
            return result;
        }
    }
}


