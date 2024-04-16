using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BH.API.ActionFilters;

public class ModelStateFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<ModelStateFilter>>();
            var actionDescriptor = ((ControllerActionDescriptor)context.ActionDescriptor);
            var controllerName = actionDescriptor.ControllerName;

            var allErrors = context.ModelState.Values.ToList().SelectMany(v => v.Errors);
            var errorMessage = string.Join(',', allErrors.Select(e => e.ErrorMessage).ToArray());
            logger.LogError($"Model validation errors: {actionDescriptor.ControllerName}.{actionDescriptor.ActionName}():{errorMessage}");

            var result = new ObjectResult(new
            {
                Status = "Bad Request",
                Errors = errorMessage
            })
            {
                StatusCode = 400
            };
            context.Result = result;
        }
    }
    public void OnActionExecuted(ActionExecutedContext context) { }
}