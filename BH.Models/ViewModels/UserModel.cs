using System;

namespace BH.Models.ViewModels
{
    public class UserModel
    {
		public int Id { get; set;}
		public string UserName { get; set;}
		public string FirstName { get; set;}
		public string LastName { get; set;}
		public string AspnetUserId { get; set;}
		public int UserTypeId { get; set;}
		public int OrganizationId { get; set;}
		public string Email { get; set;}
		public string PhoneNumber { get; set;}
		public bool Active { get; set;}
    }
    public class UserListModel : PaginationModelBase
    {
	    
    }
}

