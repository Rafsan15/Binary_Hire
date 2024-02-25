using System;
using BH.Models;
using BH.Models.Helper;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;

namespace BH.Repositories.Interface
{
	public interface IAccountRepo
	{
		Task<ResultModel<bool>> RegisterUser(RegisterUserModel model);
        Task<ResultModel<bool>> LoginUser(LoginUserModel model);
        Task<string> GenerateToken(LoginUserModel model);
        Task<bool> IsValidUser(RoleValidationModel roleModel);
	}
}

