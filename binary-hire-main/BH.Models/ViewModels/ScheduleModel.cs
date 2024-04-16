using System;

namespace BH.Models.ViewModels
{
    public class ScheduleModel : OrganizationWiseModelBase
    {
		public System.Int32 JobPostId { get; set;}
		public System.Int32 ResultId { get; set;}
		public System.DateTime OnDate { get; set;}
		public System.DateTime StartTime { get; set;}
		public System.DateTime EndTime { get; set;}
    }
    public class ScheduleListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
    }
    
    public class ScheduleRequestModel
    {
	    public Int64? Id { get; set; }
	    public int? ModifiedBy { get; set; }
	    public int? OrganizationId { get; set; }
		public System.Int32 JobPostId { get; set;}
		public System.Int32 ResultId { get; set;}
		public System.DateTime OnDate { get; set;}
		public System.DateTime StartTime { get; set;}
		public System.DateTime EndTime { get; set;}
    }
}

