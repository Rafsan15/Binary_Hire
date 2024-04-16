using System;
using BH.Models;
using BH.Models.Helper;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
	public class AccountService:IAccountService
	{
        private readonly ILogger<AccountRepo> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAccountRepo _accountRepo;
        private readonly IUserService _userService;
        private readonly IOrganizationService _organizationService;
        public AccountService(ILogger<AccountRepo> logger, IAccountRepo accountRepo, 
            IUserService userService, UserManager<IdentityUser> userManager, IOrganizationService organizationService)
		{
			_logger = logger;
            _accountRepo = accountRepo;
            _userService = userService;
            _userManager = userManager;
            _organizationService = organizationService;
        }
        
        public async Task<ResultModel<bool>> RegisterUser(RegisterUserModel model)
        {
            _logger.LogInformation("Going to execute Method: RegisterUser, Class: AccountService");
            var result = await _accountRepo.RegisterUser(model);
            _logger.LogInformation("Execution completed Method: RegisterUser, Class: AccountService");
            return result;
        }
        
        public async Task<ResultModel<LoginResponse>> LoginUser(LoginUserModel model)
        {
            ResultModel<LoginResponse> result = new ResultModel<LoginResponse>();
            _logger.LogInformation("Going to execute Method: LoginUser, Class: AccountService");
            var resultLogin = await _accountRepo.LoginUser(model);
            if (!resultLogin.IsSuccess)
            {
                result.Message = resultLogin.Message;
                result.ErrorMessages = resultLogin.ErrorMessages;
                _logger.LogError("Error Occured Method: LoginUser, Class: AccountService");
                return result;
            }
            var identityUser = await _userManager.FindByEmailAsync(model.UserName) ?? await _userManager.FindByNameAsync(model.UserName);
            var userData = await _userService.GetUserByEmail(identityUser.Email);
            var organization = await _organizationService.GetOrganizationById(userData.Data.OrganizationId);
            var role = await _userService.GetRoleById(userData.Data.Id);
            result.Data = new LoginResponse()
            {
                Token = await _accountRepo.GenerateToken(model),
                UserId = userData.Data.Id,
                UserName = userData.Data.UserName,
                OrganizationId = userData.Data.OrganizationId,
                OrganizationName = organization.Data?.Name,
                UserRoleId = role.Data.RoleId,
                UserRoleName = role.Data.RoleName
            };
            result.IsSuccess = resultLogin.IsSuccess;
            result.Message = resultLogin.Message;
            _logger.LogInformation("Execution completed Method: LoginUser, Class: AccountService");
            return result;
        }
        
        public async Task<ResultModel<bool>> ChangeUserPassword(ChangeUserPasswordModel model)
        {
            ResultModel<bool> res = new ResultModel<bool>();
            _logger.LogInformation("Going to execute Method: ChangeUserPassword, Class: AccountService");
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                _logger.LogInformation($"Going to execute _userManager.ChangePasswordAsync({model})");
                var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
                _logger.LogInformation($"Completed _userManager.ChangePasswordAsync({model})");

                if (result.Succeeded)
                {
                    res.IsSuccess = true;
                    res.Data = true;
                }
                else
                {
                    res.Message = "Invalid Current Password";
                    _logger.LogError("User password changing failed.");
                }
            }
            
            return res;
        }
        
        public async Task<bool> IsValidUser(RoleValidationModel roleModel)
        {
            _logger.LogInformation("Going to execute Method: IsValidUser, Class: AccountService");
            var result = await _accountRepo.IsValidUser(roleModel);
            _logger.LogInformation("Execution completed Method: IsValidUser, Class: AccountService");
            return result;
        }
    }
}

