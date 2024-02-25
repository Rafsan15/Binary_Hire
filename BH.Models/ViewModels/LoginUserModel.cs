using System.ComponentModel.DataAnnotations;

namespace BH.Models.ViewModels;

public class LoginUserModel
{
    [Required(ErrorMessage = "UserName is required")]
    public string? UserName { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
}