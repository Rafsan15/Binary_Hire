using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class PasswordComplexityAttribute : ValidationAttribute
{
    public bool RequireDigit { get; set; } = true;
    public bool RequireLowercase { get; set; } = true;
    public bool RequireNonAlphanumeric { get; set; } = true;
    public bool RequireUppercase { get; set; } = true;
    public int RequiredLength { get; set; } = 6;

    public override bool IsValid(object value)
    {
        var password = value as string;

        if (password == null)
        {
            // Null values are considered invalid
            return false;
        }

        if (password.Length < RequiredLength)
        {
            return false;
        }

        if (RequireDigit && !password.Any(char.IsDigit))
        {
            return false;
        }

        if (RequireLowercase && !password.Any(char.IsLower))
        {
            return false;
        }

        if (RequireNonAlphanumeric && !password.Any(c => !char.IsLetterOrDigit(c)))
        {
            return false;
        }

        if (RequireUppercase && !password.Any(char.IsUpper))
        {
            return false;
        }

        return true;
    }

    public override string FormatErrorMessage(string name)
    {
        return $"The {name} field does not meet the password complexity requirements.";
    }
}
