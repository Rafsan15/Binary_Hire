
using BH.Models;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IQuestionRepo
    {
        Task<int> SaveQuestion(QuestionRequestModel model);
        Task<ResultModel<QuestionResponseModel>> GetQuestionById(int id);
        Task<ResultModel<List<QuestionResponseModel>>> GetAllQuestion(QuestionListModel model);
        Task<ResultModel<int>> GetAllQuestionCount(QuestionListModel model);
        Task<ResultModel<bool>?> SaveListQuestion(QuestionRequestListSave question);
    }
 }



