using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BH.Services.Extensions;
public class BackgroundTask : BackgroundService
{
    private readonly ILogger<BackgroundTask> _logger;
    private readonly IBackgroundTaskService _backgroundTaskService;
    // private volatile bool isRunning = false;
    // private int progressPercentage = 0;

    public BackgroundTask(ILogger<BackgroundTask> logger, IBackgroundTaskService backgroundTaskService)
    {
        _logger = logger;
        _backgroundTaskService = backgroundTaskService;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        // if (isRunning)
        // {
        //     // Background task is already running
        //     return;
        // }
        //
        // isRunning = true;
        //
        // while (!cancellationToken.IsCancellationRequested)
        // {
        //     // Simulate background processing
        //     progressPercentage += 1;
        //     if (progressPercentage >= 100)
        //     {
        //         // Task completed
        //         break;
        //     }
        //
        //     // Wait a while and update progress
        //     await Task.Delay(1000);
        // }
        //
        // isRunning = false;
        _logger.LogInformation("Execution started");
        await _backgroundTaskService.StartBackgroundTask();
    }

    // public async Task StartAsync(CancellationToken cancellationToken)
    // {
    //     if (isRunning)
    //     {
    //         // Background task is already running
    //         return;
    //     }
    //
    //     isRunning = true;
    //
    //     while (!cancellationToken.IsCancellationRequested)
    //     {
    //         // Simulate background processing
    //         progressPercentage += 1;
    //         if (progressPercentage >= 100)
    //         {
    //             // Task completed
    //             break;
    //         }
    //
    //         // Wait a while and update progress
    //         await Task.Delay(1000);
    //     }
    //
    //     isRunning = false;
    // }
    //
    // public async Task StopAsync()
    // {
    //     if (!isRunning)
    //     {
    //         // Background task is not running
    //         return;
    //     }
    //
    //     isRunning = false;
    // }

    public async Task<double> GetProgressPercentage()
    {
        // if (!isRunning)
        // {
        //     // Background task is not running
        //     return await Task.FromResult(-1);
        // }
        // return  await Task.FromResult(progressPercentage);

        return await _backgroundTaskService.GetProgressPercentage();
    }
}