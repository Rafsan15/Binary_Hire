using System;
using System.ComponentModel.DataAnnotations;

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
	    [Required]
		public System.String Title { get; set;}
		[Required]
		public System.String Description { get; set;}
		[Range(1,int.MaxValue)]
		public int? JobType { get; set;}
		[Range(0,int.MaxValue)]
		public System.Int32 MinExperience { get; set;}
		[Range(0,int.MaxValue)]
		public System.Int32 MaxExperience { get; set;}
		public System.String Location { get; set;}
		[Required]
		public System.String Education { get; set;}
		[Required]
		public System.String Skills { get; set;}
		[Range(1,int.MaxValue)]
		public System.Int32 WorkPlace { get; set;}
		public System.Boolean IsFav { get; set;}
		public System.Boolean IsDeleted { get; set;}
		public System.Int32 Status { get; set;}
    }

    public class JobRequestPythonModel
    {
	    public string url { get; set; }
    }
}

