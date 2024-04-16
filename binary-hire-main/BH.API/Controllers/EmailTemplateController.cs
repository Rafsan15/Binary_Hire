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
public class EmailTemplateController : Controller
{
    private readonly ILogger<EmailTemplateController> _logger;
    private readonly IEmailTemplateService _emailTemplateService;
    public EmailTemplateController(ILogger<EmailTemplateController> logger, IEmailTemplateService emailTemplateService)
    {
        _logger = logger;
        _emailTemplateService = emailTemplateService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveEmailTemplate(EmailTemplateRequestModel emailTemplate)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _emailTemplateService.SaveEmailTemplate()");
            var response = await _emailTemplateService.SaveEmailTemplate(emailTemplate);
            _logger.LogInformation($"Completed _emailTemplateService.SaveEmailTemplate()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveEmailTemplate - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveEmailTemplate - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetEmailTemplateById([FromBody] int id)
    {
        _logger.LogInformation("GetEmailTemplateById starts");
        ResultModel<EmailTemplateResponseModel> response = new ResultModel<EmailTemplateResponseModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetEmailTemplateById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _emailTemplateService.GetEmailTemplateById()");
            response = await _emailTemplateService.GetEmailTemplateById(id);
            _logger.LogInformation($"Completed _emailTemplateService.GetEmailTemplateById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetEmailTemplateById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetEmailTemplateById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllEmailTemplates(EmailTemplateListModel emailTemplate)
    {
        _logger.LogInformation("GetAllEmailTemplates starts");
        try
        {
            _logger.LogInformation($"Going to execute _emailTemplateService.GetAllEmailTemplate()");
            var response = await _emailTemplateService.GetAllEmailTemplate(emailTemplate);
            _logger.LogInformation($"Completed _emailTemplateService.GetAllEmailTemplate()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllEmailTemplate - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllEmailTemplate - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllEmailTemplateCount(EmailTemplateListModel emailTemplate)
    {
        _logger.LogInformation("GetAllEmailTemplatesCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _emailTemplateService.GetAllEmailTemplateCount()");
            var response = await _emailTemplateService.GetAllEmailTemplateCount(emailTemplate);
            _logger.LogInformation($"Completed _emailTemplateService.GetAllEmailTemplateCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllEmailTemplateCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllEmailTemplateCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpGet]
    [Route("get-all-email-template-type")]
    public async Task<IActionResult> GetAllEmailTemplateTypes()
    {
        _logger.LogInformation("GetAllEmailTemplateTypes starts");
        try
        {
            _logger.LogInformation($"Going to execute _emailTemplateService.GetAllEmailTemplateTypes()");
            var response = await _emailTemplateService.GetAllEmailTemplateTypes();
            _logger.LogInformation($"Completed _emailTemplateService.GetAllEmailTemplateTypes()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllEmailTemplateTypes - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllEmailTemplateTypes - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    [HttpPost()]
    [Route("check-template-email-exists-by-organization-id")]
    public async Task<IActionResult> CheckExistingTemplateByOrganizationId([FromBody] int id)
    {
        _logger.LogInformation("CheckExistingTemplateByOrganizationId starts");
        int UserId = 0;
        int.TryParse(Request.Headers.Where(h => h.Key.Equals("UserId", StringComparison.OrdinalIgnoreCase)).Select(h => h.Value).FirstOrDefault(), out UserId);

        ResultModel<bool> response = new ResultModel<bool>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"CheckExistingTemplateByOrganizationId - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _emailTemplateService.CheckExistingTemplateByOrganizationId()");
            response = await _emailTemplateService.CheckExistingTemplateByOrganizationId(UserId, id);
            _logger.LogInformation($"Completed _emailTemplateService.CheckExistingTemplateByOrganizationId()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetEmailTemplateById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetEmailTemplateById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
}