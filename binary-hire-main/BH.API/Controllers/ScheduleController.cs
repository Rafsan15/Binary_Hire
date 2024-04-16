using BH.API.ActionFilters;
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BH.API.Controllers;

[ApiController]
[RoleValidation(Roles = new string[]{"Customer"})]
[Route("api/[controller]")]
public class ScheduleController : Controller
{
    private readonly ILogger<ScheduleController> _logger;
    private readonly IScheduleService _scheduleService;
    public ScheduleController(ILogger<ScheduleController> logger, IScheduleService scheduleService)
    {
        _logger = logger;
        _scheduleService = scheduleService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveSchedule(ScheduleRequestModel schedule)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _scheduleService.SaveSchedule()");
            var response = await _scheduleService.SaveSchedule(schedule);
            _logger.LogInformation($"Completed _scheduleService.SaveSchedule()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveSchedule - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveSchedule - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetScheduleById([FromBody] int id)
    {
        _logger.LogInformation("GetScheduleById starts");
        ResultModel<ScheduleResponseModel> response = new ResultModel<ScheduleResponseModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetScheduleById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _scheduleService.GetScheduleById()");
            response = await _scheduleService.GetScheduleById(id);
            _logger.LogInformation($"Completed _scheduleService.GetScheduleById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetScheduleById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetScheduleById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("delete-by-id")]
    public async Task<IActionResult> DeleteScheduleById([FromBody] int id)
    {
        _logger.LogInformation("DeleteScheduleById starts");
        ResultModel<bool> response = new ResultModel<bool>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"DeleteScheduleById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _scheduleService.DeleteScheduleById()");
            response = await _scheduleService.DeleteScheduleById(id);
            _logger.LogInformation($"Completed _scheduleService.DeleteScheduleById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("DeleteScheduleById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("DeleteScheduleById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllSchedules(ScheduleListModel schedule)
    {
        _logger.LogInformation("GetAllSchedules starts");
        try
        {
            _logger.LogInformation($"Going to execute _scheduleService.GetAllSchedule()");
            var response = await _scheduleService.GetAllSchedule(schedule);
            _logger.LogInformation($"Completed _scheduleService.GetAllSchedule()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllSchedule - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllSchedule - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllScheduleCount(ScheduleListModel schedule)
    {
        _logger.LogInformation("GetAllSchedulesCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _scheduleService.GetAllScheduleCount()");
            var response = await _scheduleService.GetAllScheduleCount(schedule);
            _logger.LogInformation($"Completed _scheduleService.GetAllScheduleCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllScheduleCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllScheduleCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
}