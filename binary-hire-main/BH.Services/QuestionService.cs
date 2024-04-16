using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly ILogger<QuestionRepo> _logger;
        private readonly IQuestionRepo _repo;
        public QuestionService(ILogger<QuestionRepo> logger, IQuestionRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<QuestionResponseModel>> SaveQuestion(QuestionRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveQuestion, Class: QuestionService");
            var result = await _repo.SaveQuestion(model);
            _logger.LogInformation("Execution completed Method: SaveQuestion, Class: QuestionService");
            return await GetQuestionById(result);
        }

        public async Task<ResultModel<QuestionResponseModel>> GetQuestionById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetQuestionById, Class: QuestionService");
            var result = await _repo.GetQuestionById(id);
            _logger.LogInformation("Execution completed Method: GetQuestionById, Class: QuestionService");
            return result;
        }

        public async Task<ResultModel<List<QuestionResponseModel>>> GetAllQuestion(QuestionListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllQuestion, Class: QuestionService");
            var result = await _repo.GetAllQuestion(model);
            _logger.LogInformation("Execution completed Method: GetAllQuestion, Class: QuestionService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllQuestionCount(QuestionListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllQuestionCount, Class: QuestionService");
            var result = await _repo.GetAllQuestionCount(model);
            _logger.LogInformation("Execution completed Method: GetAllQuestionCount, Class: QuestionService");
            return result;
        }

        public async Task<ResultModel<bool>?> SaveListQuestion(QuestionRequestListSave question)
        {
            _logger.LogInformation("Going to execute Method: SaveListQuestion, Class: QuestionService");
            var result = await _repo.SaveListQuestion(question);
            _logger.LogInformation("Execution completed Method: SaveListQuestion, Class: QuestionService");
            return result;
        }
    }
}


