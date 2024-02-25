using System;

namespace BH.Models.ViewModels
{
    public class ResultModel : OrganizationWiseModelBase
    {
		public System.Int32 ScreeningId { get; set;}
		public System.String Name { get; set;}
		public System.String Email { get; set;}
		public System.String LocationPath { get; set;}
		public System.Double Score { get; set;}
    }
    public class ResultListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
		public System.Int32 JobPostId { get; set;}
    }
    
    public class ResultRequestModel : RequestOrganizationWiseModelBase
    {
		public System.Int32 ScreeningId { get; set;}
		public System.String Name { get; set;}
		public System.String Email { get; set;}
		public System.String LocationPath { get; set;}
		public System.Double Score { get; set;}
    }
}

