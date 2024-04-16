using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class AssessmentService : IAssessmentService
    {
        private readonly ILogger<AssessmentRepo> _logger;
        private readonly IAssessmentRepo _repo;
        public AssessmentService(ILogger<AssessmentRepo> logger, IAssessmentRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<AssessmentResponseModel>> SaveAssessment(AssessmentRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveAssessment, Class: AssessmentService");
            var result = await _repo.SaveAssessment(model);
            _logger.LogInformation("Execution completed Method: SaveAssessment, Class: AssessmentService");
            return await GetAssessmentById(result);
        }

        public async Task<ResultModel<AssessmentResponseModel>> GetAssessmentById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetAssessmentById, Class: AssessmentService");
            var result = await _repo.GetAssessmentById(id);
            _logger.LogInformation("Execution completed Method: GetAssessmentById, Class: AssessmentService");
            return result;
        }

        public async Task<ResultModel<List<AssessmentResponseModel>>> GetAllAssessment(AssessmentListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllAssessment, Class: AssessmentService");
            var result = await _repo.GetAllAssessment(model);
            _logger.LogInformation("Execution completed Method: GetAllAssessment, Class: AssessmentService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllAssessmentCount(AssessmentListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllAssessmentCount, Class: AssessmentService");
            var result = await _repo.GetAllAssessmentCount(model);
            _logger.LogInformation("Execution completed Method: GetAllAssessmentCount, Class: AssessmentService");
            return result;
        }

        public async Task<ResultModel<bool>> SaveListAssessment(AssessmentRequestListSave assessment)
        {
            _logger.LogInformation("Going to execute Method: SaveListAssessment, Class: AssessmentService");
            var result = await _repo.SaveListAssessment(assessment);
            _logger.LogInformation("Execution completed Method: SaveListAssessment, Class: AssessmentService");
            return result;
        }

        public async Task<ResultModel<bool>> IsAssessmentDone(int id)
        {
            _logger.LogInformation("Going to execute Method: IsAssessmentDone, Class: AssessmentService");
            var result = await _repo.IsAssessmentDone(id);
            _logger.LogInformation("Execution completed Method: IsAssessmentDone, Class: AssessmentService");
            return result;
        }

        public async Task<ResultModel<List<AssessmentSummeryModel>>> GetAssessmentSummery(AssessmentSummeryRequestModel requestModel)
        {
            _logger.LogInformation("Going to execute Method: GetAssessmentSummery, Class: AssessmentService");
            var result = await _repo.GetAssessmentSummery(requestModel);
            _logger.LogInformation("Execution completed Method: GetAssessmentSummery, Class: AssessmentService");
            return result;
        }

        public async Task<ResultModel<int>> GetAssessmentSummeryCount(AssessmentSummeryRequestModel assessment)
        {
            _logger.LogInformation("Going to execute Method: GetAssessmentSummeryCount, Class: AssessmentService");
            var result = await _repo.GetAssessmentSummeryCount(assessment);
            _logger.LogInformation("Execution completed Method: GetAssessmentSummeryCount, Class: AssessmentService");
            return result;
        }
    }
}


