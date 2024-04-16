using System;

namespace BH.Models.ViewModels
{
    public class AssessmentResponseModel : AssessmentModel
    {
        public int Grade { get; set; }
        public string? QuestionText { get; set; }
    }
}

