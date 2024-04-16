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
public class QuestionController : Controller
{
    private readonly ILogger<QuestionController> _logger;
    private readonly IQuestionService _questionService;
    public QuestionController(ILogger<QuestionController> logger, IQuestionService questionService)
    {
        _logger = logger;
        _questionService = questionService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveQuestion(QuestionRequestModel question)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _questionService.SaveQuestion()");
            var response = await _questionService.SaveQuestion(question);
            _logger.LogInformation($"Completed _questionService.SaveQuestion()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveQuestion - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveQuestion - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetQuestionById([FromBody] int id)
    {
        _logger.LogInformation("GetQuestionById starts");
        ResultModel<QuestionResponseModel> response = new ResultModel<QuestionResponseModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetQuestionById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _questionService.GetQuestionById()");
            response = await _questionService.GetQuestionById(id);
            _logger.LogInformation($"Completed _questionService.GetQuestionById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetQuestionById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetQuestionById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllQuestions(QuestionListModel question)
    {
        _logger.LogInformation("GetAllQuestions starts");
        try
        {
            _logger.LogInformation($"Going to execute _questionService.GetAllQuestion()");
            var response = await _questionService.GetAllQuestion(question);
            _logger.LogInformation($"Completed _questionService.GetAllQuestion()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllQuestion - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllQuestion - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllQuestionCount(QuestionListModel question)
    {
        _logger.LogInformation("GetAllQuestionsCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _questionService.GetAllQuestionCount()");
            var response = await _questionService.GetAllQuestionCount(question);
            _logger.LogInformation($"Completed _questionService.GetAllQuestionCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllQuestionCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllQuestionCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("list-save")]
    public async Task<IActionResult> SaveListQuestion(QuestionRequestListSave question)
    {
        _logger.LogInformation("SaveListQuestion starts");

        try
        {
            _logger.LogInformation($"Going to execute _questionService.SaveListQuestion()");
            var response = await _questionService.SaveListQuestion(question);
            _logger.LogInformation($"Completed _questionService.SaveListQuestion()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveListQuestion - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveListQuestion - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
}