using System;
using BH.Models;
using BH.Models.Helper;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;

namespace BH.Services.Interface
{
	public interface IAccountService
	{
        Task<ResultModel<bool>> RegisterUser(RegisterUserModel model);
        Task<ResultModel<LoginResponse>> LoginUser(LoginUserModel requestModel);
        Task<bool> IsValidUser(RoleValidationModel roleModel);
        Task<ResultModel<bool>> ChangeUserPassword(ChangeUserPasswordModel model);
	}
}

