
using BH.Models;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IEmailTemplateRepo
    {
        Task<int> SaveEmailTemplate(EmailTemplateRequestModel model);
        Task<ResultModel<EmailTemplateResponseModel>> GetEmailTemplateById(int id);
        Task<ResultModel<List<EmailTemplateResponseModel>>> GetAllEmailTemplate(EmailTemplateListModel model);
        Task<ResultModel<int>> GetAllEmailTemplateCount(EmailTemplateListModel model);
        Task<ResultModel<List<SettingType>>?> GetAllEmailTemplateTypes();
    }
 }



