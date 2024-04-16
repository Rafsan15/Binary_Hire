using System;
using System.ComponentModel.DataAnnotations;

namespace BH.Models.ViewModels
{
    public class AssessmentSummeryModel
    {
		public System.String Name { get; set;}
		public System.String Email { get; set;}
		public System.Int32 QuestionAsked { get; set;}
		public System.Decimal Score { get; set;}
    }
    
    public class AssessmentSummeryRequestModel: PaginationModelBase
    {
	    [Range(1,int.MaxValue)]
	    public System.Int32 JobId { get; set;}
    }
    
}

