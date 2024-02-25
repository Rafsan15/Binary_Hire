using BH.Models;
using BH.Models.ViewModels;
using BH.Repositories;
using BH.Repositories.Interface;
using BH.Services.Constants;
using BH.Services.Interface;
using Microsoft.Extensions.Logging;

namespace BH.Services
{
    public class EmailTemplateService : IEmailTemplateService
    {
        private readonly ILogger<EmailTemplateRepo> _logger;
        private readonly IEmailTemplateRepo _repo;
        public EmailTemplateService(ILogger<EmailTemplateRepo> logger, IEmailTemplateRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<ResultModel<EmailTemplateResponseModel>> SaveEmailTemplate(EmailTemplateRequestModel model)
        {
            _logger.LogInformation("Going to execute Method: SaveEmailTemplate, Class: EmailTemplateService");
            var result = await _repo.SaveEmailTemplate(model);
            _logger.LogInformation("Execution completed Method: SaveEmailTemplate, Class: EmailTemplateService");
            return await GetEmailTemplateById(result);
        }

        public async Task<ResultModel<EmailTemplateResponseModel>> GetEmailTemplateById(int id)
        {
            _logger.LogInformation("Going to execute Method: GetEmailTemplateById, Class: EmailTemplateService");
            var result = await _repo.GetEmailTemplateById(id);
            _logger.LogInformation("Execution completed Method: GetEmailTemplateById, Class: EmailTemplateService");
            return result;
        }

        public async Task<ResultModel<List<EmailTemplateResponseModel>>> GetAllEmailTemplate(EmailTemplateListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllEmailTemplate, Class: EmailTemplateService");
            var result = await _repo.GetAllEmailTemplate(model);
            _logger.LogInformation("Execution completed Method: GetAllEmailTemplate, Class: EmailTemplateService");
            return result;
        }

        public async Task<ResultModel<int>> GetAllEmailTemplateCount(EmailTemplateListModel model)
        {
            _logger.LogInformation("Going to execute Method: GetAllEmailTemplateCount, Class: EmailTemplateService");
            var result = await _repo.GetAllEmailTemplateCount(model);
            _logger.LogInformation("Execution completed Method: GetAllEmailTemplateCount, Class: EmailTemplateService");
            return result;
        }

        public async Task<ResultModel<List<SettingType>>?> GetAllEmailTemplateTypes()
        {
            _logger.LogInformation("Going to execute Method: GetAllEmailTemplateTypes, Class: EmailTemplateService");
            var result = await _repo.GetAllEmailTemplateTypes();
            _logger.LogInformation("Execution completed Method: GetAllEmailTemplateTypes, Class: EmailTemplateService");
            return result;
        }

        public async Task<ResultModel<bool>> CheckExistingTemplateByOrganizationId(int userId, int orgId)
        {
            _logger.LogInformation("Going to execute Method: CheckExistingTemplateByOrganizationId, Class: EmailTemplateService");
            var result = new ResultModel<bool>();
            var templates = await GetAllEmailTemplate(new EmailTemplateListModel()
            {
                OrganizationId = orgId,
                Page = 1,
                PageSize = 10
            });
            if (templates.IsSuccess && templates.Data != null && templates.Data.Count > 0)
            {
                result.IsSuccess = true;
                result.Data = true;
                return result;
            }
            EmailTemplateRequestModel templateModel = new EmailTemplateRequestModel()
            {
                Subject = EmailTemplateConstants.SUBJECT_TEMPLATE,
                Body = EmailTemplateConstants.ACCEPTENCE_TEMPLATE_BODY,
                EmailTypeId = SettingConstants.EMAIL_TEMPLATE_ACCEPTANCE,
                OrganizationId = orgId,
                ModifiedBy = userId
            };
            await SaveEmailTemplate(templateModel);
            EmailTemplateRequestModel templateModel2 = new EmailTemplateRequestModel()
            {
                Subject = EmailTemplateConstants.SUBJECT_TEMPLATE,
                Body = EmailTemplateConstants.REJECT_TEMPLATE_BODY,
                EmailTypeId = SettingConstants.EMAIL_TEMPLATE_REJECT,
                OrganizationId = orgId,
                ModifiedBy = userId
            };
            await SaveEmailTemplate(templateModel2);
            result.IsSuccess = true;
            result.Data = false;
            _logger.LogInformation("Execution completed Method: CheckExistingTemplateByOrganizationId, Class: EmailTemplateService");
            return result;
        }
    }
}


