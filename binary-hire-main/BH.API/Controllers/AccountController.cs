using BH.API.ActionFilters;
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BH.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : Controller
{
    private readonly ILogger<AccountController> _logger;
    private readonly IAccountService _accountService;
    public AccountController(ILogger<AccountController> logger, IAccountService accountService)
    {
        _logger = logger;
        _accountService = accountService;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterUser(RegisterUserModel requestModel)
    {
        _logger.LogInformation("Going to execute Method: RegisterUser, Class: AccountController");
        var result = await _accountService.RegisterUser(requestModel);
        _logger.LogInformation("Execution completed Method: RegisterUser, Class: AccountController");

        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }
        
    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginUserModel requestModel)
    {
        _logger.LogInformation("Going to execute Method: Login, Class: AccountController");
        ResultModel<LoginResponse> result = await _accountService.LoginUser(requestModel);
        _logger.LogInformation("Execution completed Method: Login, Class: AccountController");
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }
    [Authorize]
    [RoleValidation(Roles = new string[]{"Admin,Customer"})]
    [HttpGet]
    public string Get()
    {
        return "You hit me!";
    }
    
    [HttpPost()]
    [Route("change-password")]
    public async Task<IActionResult> ChangeUserPassword(ChangeUserPasswordModel model)
    {
        ResultModel<bool> result = new ResultModel<bool>();
        try
        {
            if (model.Password != model.ConfirmPassword)
            {
                result.Data = false;
                result.Message = "Password must be equal to confirm password.";
                return Ok(result);
            }
            _logger.LogInformation("Going to execute Method: Login, Class: AccountController");
            result = await _accountService.ChangeUserPassword(model);
            _logger.LogInformation("Execution completed Method: Login, Class: AccountController");
            
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError("ChangeUserPassword - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

}