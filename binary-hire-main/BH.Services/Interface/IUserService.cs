using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IUserService
    {
        Task<ResultModel<UserModel>> SaveUser(UserModel model);
        Task<ResultModel<UserModel>> GetUserById(int id);
        Task<ResultModel<List<UserResponse>>> GetAllUser(UserListModel model);
        Task<ResultModel<int>> GetAllUserCount(UserListModel model);
        Task<ResultModel<bool>> IsUserNameUnique(string? userName);
        Task<ResultModel<UserModel>> GetUserByEmail(string identityUserEmail);
        Task<ResultModel<UserRoleModel>> GetRoleById(int dataId);
    }
 }




