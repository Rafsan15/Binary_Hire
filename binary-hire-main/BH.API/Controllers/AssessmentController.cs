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
public class AssessmentController : Controller
{
    private readonly ILogger<AssessmentController> _logger;
    private readonly IAssessmentService _assessmentService;
    public AssessmentController(ILogger<AssessmentController> logger, IAssessmentService assessmentService)
    {
        _logger = logger;
        _assessmentService = assessmentService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveAssessment(AssessmentRequestModel assessment)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _assessmentService.SaveAssessment()");
            var response = await _assessmentService.SaveAssessment(assessment);
            _logger.LogInformation($"Completed _assessmentService.SaveAssessment()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveAssessment - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveAssessment - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetAssessmentById([FromBody] int id)
    {
        _logger.LogInformation("GetAssessmentById starts");
        ResultModel<AssessmentResponseModel> response = new ResultModel<AssessmentResponseModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetAssessmentById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _assessmentService.GetAssessmentById()");
            response = await _assessmentService.GetAssessmentById(id);
            _logger.LogInformation($"Completed _assessmentService.GetAssessmentById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAssessmentById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAssessmentById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllAssessments(AssessmentListModel assessment)
    {
        _logger.LogInformation("GetAllAssessments starts");
        try
        {
            _logger.LogInformation($"Going to execute _assessmentService.GetAllAssessment()");
            var response = await _assessmentService.GetAllAssessment(assessment);
            _logger.LogInformation($"Completed _assessmentService.GetAllAssessment()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllAssessment - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllAssessment - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllAssessmentCount(AssessmentListModel assessment)
    {
        _logger.LogInformation("GetAllAssessmentsCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _assessmentService.GetAllAssessmentCount()");
            var response = await _assessmentService.GetAllAssessmentCount(assessment);
            _logger.LogInformation($"Completed _assessmentService.GetAllAssessmentCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllAssessmentCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllAssessmentCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("is-assessment-done")]
    public async Task<IActionResult> IsAssessmentDone([FromBody]int id)
    {
        _logger.LogInformation("IsAssessmentDone starts");

        try
        {
            _logger.LogInformation($"Going to execute _questionService.IsAssessmentDone()");
            var response = await _assessmentService.IsAssessmentDone(id);
            _logger.LogInformation($"Completed _questionService.IsAssessmentDone()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("IsAssessmentDone - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveListQuestion - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("list-save")]
    public async Task<IActionResult> SaveListAssessment(AssessmentRequestListSave assessment)
    {
        _logger.LogInformation("SaveListAssessment starts");

        try
        {
            _logger.LogInformation($"Going to execute _assessmentService.SaveListAssessment()");
            var response = await _assessmentService.SaveListAssessment(assessment);
            _logger.LogInformation($"Completed _assessmentService.SaveListAssessment()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveListAssessment - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveListAssessment - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    [HttpPost()]
    [Route("get-assessment-summery")]
    public async Task<IActionResult> GetAssessmentSummery(AssessmentSummeryRequestModel requestModel)
    {
        _logger.LogInformation("GetAssessmentSummery starts");
        try
        {
            _logger.LogInformation($"Going to execute _assessmentService.GetAssessmentSummery()");
            var response = await _assessmentService.GetAssessmentSummery(requestModel);
            _logger.LogInformation($"Completed _assessmentService.GetAssessmentSummery()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAssessmentSummery - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAssessmentSummery - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-assessment-summery-count")]
    public async Task<IActionResult> GetAssessmentSummeryCount(AssessmentSummeryRequestModel assessment)
    {
        _logger.LogInformation("GetAssessmentSummeryCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _assessmentService.GetAssessmentSummeryCount()");
            var response = await _assessmentService.GetAssessmentSummeryCount(assessment);
            _logger.LogInformation($"Completed _assessmentService.GetAssessmentSummeryCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllAssessmentCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllAssessmentCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
}