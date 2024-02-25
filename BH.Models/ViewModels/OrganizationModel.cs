using System;

namespace BH.Models.ViewModels
{
    public class OrganizationModel
    {
		public int Id { get; set;}
		public string Name { get; set;}
    }
    public class OrganizationListModel : PaginationModelBase
    {
	    
    }
}

