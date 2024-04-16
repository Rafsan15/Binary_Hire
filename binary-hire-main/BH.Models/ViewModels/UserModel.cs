using System;
using System.ComponentModel.DataAnnotations;

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

    public class ChangeUserPasswordModel
    {
	    public int? OrganizationId { get; set; }
	    [Required]
	    public string UserName { get; set; }
	    [Required]
	    public string OldPassword { get; set; }
	    [Required]
	    public string Password { get; set; }
	    [Required]
	    public string ConfirmPassword { get; set; }
    }
}

