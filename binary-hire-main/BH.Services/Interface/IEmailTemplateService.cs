using BH.Models;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IEmailTemplateService
    {
        Task<ResultModel<EmailTemplateResponseModel>> SaveEmailTemplate(EmailTemplateRequestModel model);
        Task<ResultModel<EmailTemplateResponseModel>> GetEmailTemplateById(int id);
        Task<ResultModel<List<EmailTemplateResponseModel>>> GetAllEmailTemplate(EmailTemplateListModel model);
        Task<ResultModel<int>> GetAllEmailTemplateCount(EmailTemplateListModel model);
        Task<ResultModel<List<SettingType>>?> GetAllEmailTemplateTypes();
        Task<ResultModel<bool>> CheckExistingTemplateByOrganizationId(int userId, int id);
    }
 }




