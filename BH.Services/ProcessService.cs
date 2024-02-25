using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Constants;
using BH.Services.Extensions;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class ProcessService : IProcessService
    {
        private readonly ILogger<ProcessService> _logger;
        private readonly IScreeningService _screeningService;
        private readonly IBackgroundTaskService _backgroundTask;


        public ProcessService(ILogger<ProcessService> logger,
            IScreeningService screeningService, IBackgroundTaskService backgroundTaskService)
        {
            _logger = logger;
            _screeningService = screeningService;
            _backgroundTask = backgroundTaskService;
        }

        public async Task<string> ProcessResult(CVInputModel input)
        {
            _logger.LogInformation("Going to execute Method: ProcessResult, Class: ResultService");
            ScreeningRequestModel requestModel = new ScreeningRequestModel()
            {
                JobPostId = input.JobPostId,
                LocationPath = input.FileDirectory,
                UserId = input.UserId,
                WorkflowMasterId = input.WorkflowId,
                Status = SettingConstants.REQUEST_QUEUED
            };
            var screening = await _screeningService.SaveScreening(requestModel);
            if (screening.IsSuccess)
            {
                await _backgroundTask.StartBackgroundTask();
            }
            _logger.LogInformation("Execution completed Method: ProcessResult, Class: ResultService");
            return null;
        }
    }
}


