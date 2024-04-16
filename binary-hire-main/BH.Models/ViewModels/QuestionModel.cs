using System;

namespace BH.Models.ViewModels
{
    public class QuestionModel : OrganizationWiseModelBase
    {
		public System.Int32 JobId { get; set;}
		public System.String QuestionText { get; set;}
    }
    public class QuestionListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
    }
    
    public class QuestionRequestModel : RequestOrganizationWiseModelBase
    {
		public System.Int32 JobId { get; set;}
		public System.String QuestionText { get; set;}
    }

    public class QuestionRequestItem:RequestOrganizationWiseModelBase
    {
	    public System.String QuestionText { get; set;}
	    public bool IsDelete { get; set; }
    }

    public class QuestionRequestListSave
    {
	    public int JobId { get; set; }
	    public List<QuestionRequestItem> QuestionItems { get; set; }
	    
    }
}

