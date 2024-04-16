using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class OrganizationService : IOrganizationService
    {
        private readonly ILogger<OrganizationRepo> _logger;
        private readonly IOrganizationRepo _repo;
        public OrganizationService(ILogger<OrganizationRepo> logger, IOrganizationRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<OrganizationModel>> SaveOrganization(OrganizationModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveOrganization, Class: OrganizationService");
            var result = await _repo.SaveOrganization(model);
            _logger.LogInformation("Execution completed Method: SaveOrganization, Class: OrganizationService");
            return await GetOrganizationById(result);
        }

        public async Task<ResultModel<OrganizationModel>> GetOrganizationById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetOrganizationById, Class: OrganizationService");
            var result = await _repo.GetOrganizationById(id);
            _logger.LogInformation("Execution completed Method: GetOrganizationById, Class: OrganizationService");
            return result;
        }

        public async Task<ResultModel<List<OrganizationModel>>> GetAllOrganization(OrganizationListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllOrganization, Class: OrganizationService");
            var result = await _repo.GetAllOrganization(model);
            _logger.LogInformation("Execution completed Method: GetAllOrganization, Class: OrganizationService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllOrganizationCount(OrganizationListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllOrganizationCount, Class: OrganizationService");
            var result = await _repo.GetAllOrganizationCount(model);
            _logger.LogInformation("Execution completed Method: GetAllOrganizationCount, Class: OrganizationService");
            return result;
        }
    }
}


