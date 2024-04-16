using System;
using System.ComponentModel.DataAnnotations;

namespace BH.Models.ViewModels
{
    public class RegisterUserModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string? Email { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "FirstName is required")]
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }
        public int UserTypeId { get; set; }
        public int OrganizationId { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordComplexity]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Required(ErrorMessage = "ConfirmPassword is required")]
        [Compare("Password", ErrorMessage = "The password and confirm password do not match.")]
        [DataType(DataType.Password)]
        public string? ConfirmPassword { get; set; }
    }
}

