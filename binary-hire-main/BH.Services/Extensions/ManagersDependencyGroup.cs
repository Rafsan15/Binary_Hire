using System;
using BH.Repositories;
using BH.Repositories.Connections;
using BH.Repositories.Connections.Interface;
using BH.Repositories.Interface;
using BH.Services.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace BH.Services.Extensions
{
	public static class ManagersDependencyGroup
	{
        public static IServiceCollection AddManagersDependencyGroup(this IServiceCollection services)
		{
            // Connection
            services.AddTransient<IDbConnectionFactory, DapperConnectionFactory>();
            services.AddSingleton<IBackgroundTaskService, BackgroundTaskService>();
            services.AddSingleton<IExtractFile, ExtractFile>();

            //Services
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IOrganizationService, OrganizationService>();
            services.AddTransient<IWorkflowMasterService, WorkflowMasterService>();
            services.AddTransient<IResultService, ResultService>();
            services.AddTransient<IJobPostService, JobPostService>();
            services.AddTransient<IScreeningService, ScreeningService>();
            services.AddTransient<IProcessService, ProcessService>();
            services.AddTransient<IScheduleService, ScheduleService>();
            services.AddTransient<IEmailTemplateService, EmailTemplateService>();
            services.AddTransient<IQuestionService, QuestionService>();
            services.AddTransient<IAssessmentService, AssessmentService>();

            //Repositories
            services.AddTransient<IAccountRepo, AccountRepo>();
            services.AddTransient<IUserRepo, UserRepo>();
            services.AddTransient<IOrganizationRepo, OrganizationRepo>();
            services.AddTransient<IWorkflowMasterRepo, WorkflowMasterRepo>();
            services.AddTransient<IResultRepo, ResultRepo>();
            services.AddTransient<IJobPostRepo, JobPostRepo>();
            services.AddTransient<IScreeningRepo, ScreeningRepo>();
            services.AddTransient<IScheduleRepo, ScheduleRepo>();
            services.AddTransient<IEmailTemplateRepo, EmailTemplateRepo>();
            services.AddTransient<IQuestionRepo, QuestionRepo>();
            services.AddTransient<IAssessmentRepo, AssessmentRepo>();

            return services;
        }
	}
}

