using BH.Models.Helper;
using BH.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BH.API.ActionFilters;

public class RoleValidationAttribute : Attribute, IAuthorizationFilter
{
    public string[] Roles { get; set; }
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<RoleValidationAttribute>>();
        var manager = context.HttpContext.RequestServices.GetService<IAccountService>();
        try
        {
            logger.LogInformation("RoleValidationAttribute.OnAuthorization:Trying to read userId from context.HttpContext.Request.Headers.");
            var userId = 0;
            var userIdInRequest = context.HttpContext.Request.Headers.Where(h => h.Key.Equals("UserId", StringComparison.OrdinalIgnoreCase))
                .Select(h => h.Value).FirstOrDefault();
            int.TryParse(userIdInRequest, out userId);
            logger.LogInformation("RoleValidationAttribute.OnAuthorization: userId read successfully.");

            var requestModel = new RoleValidationModel()
            {
                Role = string.Join(',', Roles),
                UserId = userId
            };

            logger.LogInformation("CustomAuthorizationAttribute.OnAuthorization:Executing userManager.HasPermission");
            var isValid = manager.IsValidUser(requestModel).Result;
            logger.LogInformation("CustomAuthorizationAttribute.OnAuthorization:Execution completed of userManager.HasPermission");

            if (!isValid)
            {
                context.Result = new UnauthorizedResult();
            }
        }
        catch (Exception e)
        {
            logger.LogError("Problem : " + e.ToString());
            context.Result = new UnauthorizedResult();
        }
    }
}