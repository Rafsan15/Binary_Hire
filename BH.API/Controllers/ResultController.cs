using BH.API.ActionFilters;
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Services.Extensions;
using BH.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BH.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResultController : Controller
{
    private readonly ILogger<ResultController> _logger;
    private readonly IResultService _resultService;
    private readonly IBackgroundTaskService _backgroundTaskService;
    private readonly IProcessService _processService;
    
    public ResultController(ILogger<ResultController> logger, IResultService resultService, 
        IBackgroundTaskService backgroundTaskService, IProcessService processService)
    {
        _logger = logger;
        _resultService = resultService;
        _backgroundTaskService = backgroundTaskService;
        _processService = processService;
    }
    [HttpPost()]
    [Route("process")]
    public async Task<IActionResult> ProcessResult(CVInputModel model)
    {
        _logger.LogInformation("ProcessResult starts");

        try
        {
            _logger.LogInformation($"Going to execute _resultService.ProcessResult()");
            var response = _processService.ProcessResult(model);
            _logger.LogInformation($"Completed _resultService.ProcessResult()");

            return Ok(response);

        }
        catch (Exception ex)
        {
            _logger.LogError("ProcessResult - Exception : " + ex.ToString());
        }
        return Ok();
    }
    
    // [HttpPost]
    // [Route("task-start")]
    // public async Task<IActionResult> StartBackgroundTask(CVInputModel model)
    // {
    //     var response = await _resultService.ProcessResult(model);
    //     return Ok("Background process started");
    // }
    
    [HttpGet]
    [Route("task-progress")]
    public async Task<IActionResult> GetProgressPercentage()
    {
        var progressPercentage = await _backgroundTaskService.GetProgressPercentage();
        return Ok(progressPercentage);
    }

    [HttpPost()]
    [Route("get-workflow-by-job-id")]
    public async Task<IActionResult> GetWorkflowByJob([FromBody] int id)
    {
        _logger.LogInformation("GetWorkflowByJob starts");
        try
        {
            _logger.LogInformation($"Going to execute _resultService.GetWorkflowByJob()");
            var response = await _resultService.GetWorkflowByJob(id);
            _logger.LogInformation($"Completed _resultService.GetWorkflowByJob()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetWorkflowByJob - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetWorkflowByJob - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllResults(ResultListModel result)
    {
        _logger.LogInformation("GetAllResults starts");
        try
        {
            _logger.LogInformation($"Going to execute _resultService.GetAllResult()");
            var response = await _resultService.GetAllResult(result);
            _logger.LogInformation($"Completed _resultService.GetAllResult()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllResult - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllResult - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllResultCount(ResultListModel result)
    {
        _logger.LogInformation("GetAllResultsCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _resultService.GetAllResultCount()");
            var response = await _resultService.GetAllResultCount(result);
            _logger.LogInformation($"Completed _resultService.GetAllResultCount()");

            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllResultCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllResultCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    [HttpPost()]
    [Route("get-result-by-id")]
    public async Task<IActionResult> GetResultById([FromBody] int id)
    {
        _logger.LogInformation("GetResultById starts");
        ResultModel<ResultResponseModel> response = new ResultModel<ResultResponseModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetResultById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _resultService.GetResultById()");
            response = await _resultService.GetResultById(id);
            _logger.LogInformation($"Completed _resultService.GetResultById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetResultById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetResultById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

    

}