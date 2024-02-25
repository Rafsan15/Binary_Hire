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
public class WorkFlowController : Controller
{
    private readonly ILogger<WorkFlowController> _logger;
    private readonly IWorkflowMasterService _workFlowService;
    public WorkFlowController(ILogger<WorkFlowController> logger, IWorkflowMasterService workFlowService)
    {
        _logger = logger;
        _workFlowService = workFlowService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveWorkFlow(WorkflowMasterDetailRequestModel workFlow)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _workFlowService.SaveWorkFlow()");
            var response = await _workFlowService.SaveWorkflowMaster(workFlow);
            _logger.LogInformation($"Completed _workFlowService.SaveWorkFlow()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveWorkFlow - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveWorkFlow - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetWorkFlowById([FromBody] int id)
    {
        _logger.LogInformation("GetWorkFlowById starts");
        ResultModel<WorkflowResponseModel> response = new ResultModel<WorkflowResponseModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetWorkFlowById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _workFlowService.GetWorkFlowById()");
            response = await _workFlowService.GetWorkflowMasterById(id);
            _logger.LogInformation($"Completed _workFlowService.GetWorkFlowById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetWorkFlowById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetWorkFlowById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllWorkFlows(WorkflowMasterListModel workFlow)
    {
        _logger.LogInformation("GetAllWorkFlows starts");
        try
        {
            _logger.LogInformation($"Going to execute _workFlowService.GetAllWorkFlow()");
            var response = await _workFlowService.GetAllWorkflowMaster(workFlow);
            _logger.LogInformation($"Completed _workFlowService.GetAllWorkFlow()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllWorkFlow - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllWorkFlow - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllWorkFlowCount(WorkflowMasterListModel workFlow)
    {
        _logger.LogInformation("GetAllWorkFlowsCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _workFlowService.GetAllWorkFlowCount()");
            var response = await _workFlowService.GetAllWorkflowMasterCount(workFlow);
            _logger.LogInformation($"Completed _workFlowService.GetAllWorkFlowCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllWorkFlowCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllWorkFlowCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpGet]
    [Route("get-all-workflow-type")]
    public async Task<IActionResult> GetAllWorkFlowTypes()
    {
        _logger.LogInformation("GetAllWorkFlows starts");
        // int OrganizationId = 0;
        // int.TryParse(Request.Headers.Where(h => h.Key.Equals("OrganizationId", StringComparison.OrdinalIgnoreCase)).Select(h => h.Value).FirstOrDefault(), out OrganizationId);
 
        try
        {
            _logger.LogInformation($"Going to execute _workFlowService.GetAllWorkFlowTypes()");
            var response = await _workFlowService.GetAllWorkFlowTypes();
            _logger.LogInformation($"Completed _workFlowService.GetAllWorkFlowTypes()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllWorkFlow - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllWorkFlow - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
}