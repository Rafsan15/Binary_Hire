using BH.API.ActionFilters;
using BH.Models;
using BH.Models.ViewModels;
using BH.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BH.API.Controllers;

[ApiController]
[RoleValidation(Roles = new string[]{"Admin"})]
[Route("api/[controller]")]
public class OrganizationController : Controller
{
    private readonly ILogger<OrganizationController> _logger;
    private readonly IOrganizationService _organizationService;
    public OrganizationController(ILogger<OrganizationController> logger, IOrganizationService organizationService)
    {
        _logger = logger;
        _organizationService = organizationService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveOrganization(OrganizationModel organization)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _organizationService.SaveOrganization()");
            var response = await _organizationService.SaveOrganization(organization);
            _logger.LogInformation($"Completed _organizationService.SaveOrganization()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveOrganization - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveOrganization - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetOrganizationById([FromBody] int id)
    {
        _logger.LogInformation("GetOrganizationById starts");
        ResultModel<OrganizationModel> response = new ResultModel<OrganizationModel>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetOrganizationById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _organizationService.GetOrganizationById()");
            response = await _organizationService.GetOrganizationById(id);
            _logger.LogInformation($"Completed _organizationService.GetOrganizationById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetOrganizationById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetOrganizationById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllOrganizations(OrganizationListModel organization)
    {
        _logger.LogInformation("GetAllOrganizations starts");
        try
        {
            _logger.LogInformation($"Going to execute _organizationService.GetAllOrganization()");
            var response = await _organizationService.GetAllOrganization(organization);
            _logger.LogInformation($"Completed _organizationService.GetAllOrganization()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllOrganization - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllOrganization - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllOrganizationCount(OrganizationListModel organization)
    {
        _logger.LogInformation("GetAllOrganizationsCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _organizationService.GetAllOrganizationCount()");
            var response = await _organizationService.GetAllOrganizationCount(organization);
            _logger.LogInformation($"Completed _organizationService.GetAllOrganizationCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllOrganizationCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllOrganizationCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    
}