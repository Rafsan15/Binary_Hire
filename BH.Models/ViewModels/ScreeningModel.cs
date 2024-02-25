using System;

namespace BH.Models.ViewModels
{
    public class ScreeningModel : OrganizationWiseModelBase
    {
		public System.Int32 JobPostId { get; set;}
		public System.Int32 WorkflowMasterId { get; set;}
		public System.String LocationPath { get; set;}
		public System.Int32 Status { get; set;}
		public System.Int32 UserId { get; set;}
    }
    public class ScreeningListModel : PaginationModelBase
    {
    }
    
    public class ScreeningRequestModel : RequestModelBase
    {
		public System.Int32 JobPostId { get; set;}
		public System.Int32 WorkflowMasterId { get; set;}
		public System.String LocationPath { get; set;}
		public System.Int32 Status { get; set;}
		public System.Int32 UserId { get; set;}
    }
}

