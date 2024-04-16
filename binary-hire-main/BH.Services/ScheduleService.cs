using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly ILogger<ScheduleRepo> _logger;
        private readonly IScheduleRepo _repo;
        public ScheduleService(ILogger<ScheduleRepo> logger, IScheduleRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<ScheduleResponseModel>> SaveSchedule(ScheduleRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveSchedule, Class: ScheduleService");
            var result = await _repo.SaveSchedule(model);
            _logger.LogInformation("Execution completed Method: SaveSchedule, Class: ScheduleService");
            return await GetScheduleById(result);
        }

        public async Task<ResultModel<ScheduleResponseModel>> GetScheduleById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetScheduleById, Class: ScheduleService");
            var result = await _repo.GetScheduleById(id);
            _logger.LogInformation("Execution completed Method: GetScheduleById, Class: ScheduleService");
            return result;
        }

        public async Task<ResultModel<List<ScheduleResponseModel>>> GetAllSchedule(ScheduleListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllSchedule, Class: ScheduleService");
            var result = await _repo.GetAllSchedule(model);
            _logger.LogInformation("Execution completed Method: GetAllSchedule, Class: ScheduleService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllScheduleCount(ScheduleListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllScheduleCount, Class: ScheduleService");
            var result = await _repo.GetAllScheduleCount(model);
            _logger.LogInformation("Execution completed Method: GetAllScheduleCount, Class: ScheduleService");
            return result;
        }

        public async Task<ResultModel<bool>> DeleteScheduleById(int id)
        {
            _logger.LogInformation("Going to execute Method: DeleteScheduleById, Class: ScheduleService");
            var result = await _repo.DeleteScheduleById(id);
            _logger.LogInformation("Execution completed Method: DeleteScheduleById, Class: ScheduleService");
            return result;
        }
    }
}


