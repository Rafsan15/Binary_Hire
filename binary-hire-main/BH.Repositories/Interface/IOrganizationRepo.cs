
using BH.Models;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IOrganizationRepo
    {
        Task<int> SaveOrganization(OrganizationModel model);
        Task<ResultModel<OrganizationModel>> GetOrganizationById(int id);
        Task<ResultModel<List<OrganizationModel>>> GetAllOrganization(OrganizationListModel model);
        Task<ResultModel<int>> GetAllOrganizationCount(OrganizationListModel model);
    }
 }



