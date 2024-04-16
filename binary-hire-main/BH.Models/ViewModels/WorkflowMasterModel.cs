using System;

namespace BH.Models.ViewModels
{
    public class WorkflowMasterModel : OrganizationWiseModelBase
    {
		public System.String Name { get; set;}
    }
    public class WorkflowMasterListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
    }
    
    public class WorkflowMasterRequestModel : RequestOrganizationWiseModelBase
    {
		public System.String Name { get; set;}
    }
}

