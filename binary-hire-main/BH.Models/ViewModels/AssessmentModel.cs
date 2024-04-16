using System;

namespace BH.Models.ViewModels
{
    public class AssessmentModel : OrganizationWiseModelBase
    {
		public System.Int32 ResultId { get; set;}
		public System.Int32 QuestionId { get; set;}
		public System.Int32 Score { get; set;}
    }
    public class AssessmentListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
    }
    
    public class AssessmentRequestModel : RequestOrganizationWiseModelBase
    {
		public System.Int32 ResultId { get; set;}
		public System.Int32 QuestionId { get; set;}
		public System.Int32 Score { get; set;}
    }

    public class AssessmentRequestListSave
    {
	    public int ResultId { get; set; }
	    public List<AssessmentRequestItem> AssessmentItems { get; set; }
    }
    public class AssessmentRequestItem:RequestOrganizationWiseModelBase
    {
	    public System.Int32 QuestionId { get; set;}
	    public System.Int32 Score { get; set;}
    }
}

