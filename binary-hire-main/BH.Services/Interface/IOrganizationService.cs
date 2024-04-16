using BH.Models;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IOrganizationService
    {
        Task<ResultModel<OrganizationModel>> SaveOrganization(OrganizationModel model);
        Task<ResultModel<OrganizationModel>> GetOrganizationById(int id);
        Task<ResultModel<List<OrganizationModel>>> GetAllOrganization(OrganizationListModel model);
        Task<ResultModel<int>> GetAllOrganizationCount(OrganizationListModel model);
    }
 }




