using System;

namespace BH.Models.ViewModels
{
    public class EmailTemplateModel : OrganizationWiseModelBase
    {
		public System.Int32 EmailTypeId { get; set;}
		public System.String Subject { get; set;}
		public System.String Body { get; set;}
    }
    public class EmailTemplateListModel : PaginationModelBase
    {
		public System.Int32 OrganizationId { get; set;}
    }
    
    public class EmailTemplateRequestModel : RequestOrganizationWiseModelBase
    {
		public System.Int32 EmailTypeId { get; set;}
		public System.String Subject { get; set;}
		public System.String Body { get; set;}
    }
}

