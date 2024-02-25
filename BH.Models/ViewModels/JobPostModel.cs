using System;

namespace BH.Models.ViewModels
{
    public class JobPostModel : OrganizationWiseModelBase
    {
		public System.String Title { get; set;}
		public System.String Description { get; set;}
		public System.Int32 JobType { get; set;}
		public System.Int32 MinExperience { get; set;}
		public System.Int32 MaxExperience { get; set;}
		public System.String Location { get; set;}
		public System.String Education { get; set;}
		public System.String Skills { get; set;}
		public System.Int32 WorkPlace { get; set;}
		public System.Boolean IsFav { get; set;}
		public System.Boolean IsDeleted { get; set;}
		public System.Int32 Status { get; set;}
    }
    public class JobPostListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
    }
    
    public class JobPostRequestModel : RequestOrganizationWiseModelBase
    {
		public System.String Title { get; set;}
		public System.String Description { get; set;}
		public int? JobType { get; set;}
		public System.Int32 MinExperience { get; set;}
		public System.Int32 MaxExperience { get; set;}
		public System.String Location { get; set;}
		public System.String Education { get; set;}
		public System.String Skills { get; set;}
		public System.Int32 WorkPlace { get; set;}
		public System.Boolean IsFav { get; set;}
		public System.Boolean IsDeleted { get; set;}
		public System.Int32 Status { get; set;}
    }
}

