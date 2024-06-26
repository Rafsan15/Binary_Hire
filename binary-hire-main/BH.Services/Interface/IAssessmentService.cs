﻿using BH.Models;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IAssessmentService
    {
        Task<ResultModel<AssessmentResponseModel>> SaveAssessment(AssessmentRequestModel model);
        Task<ResultModel<AssessmentResponseModel>> GetAssessmentById(int id);
        Task<ResultModel<List<AssessmentResponseModel>>> GetAllAssessment(AssessmentListModel model);
        Task<ResultModel<int>> GetAllAssessmentCount(AssessmentListModel model);
        Task<ResultModel<bool>> SaveListAssessment(AssessmentRequestListSave assessment);
        Task<ResultModel<bool>> IsAssessmentDone(int id);
        Task<ResultModel<List<AssessmentSummeryModel>>> GetAssessmentSummery(AssessmentSummeryRequestModel requestModel);
        Task<ResultModel<int>> GetAssessmentSummeryCount(AssessmentSummeryRequestModel assessment);
    }
 }




