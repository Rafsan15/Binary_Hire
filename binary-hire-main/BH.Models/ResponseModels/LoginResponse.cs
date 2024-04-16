namespace BH.Models.ResponseModels;

public class LoginResponse
{
    public int UserId { get; set; }
    public string? UserName { get; set; }
    public int OrganizationId { get; set; }
    public string? Token { get; set; }
    public string? OrganizationName { get; set; }
    public int UserRoleId { get; set; }
    public string? UserRoleName { get; set; }
}