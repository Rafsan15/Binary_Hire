using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace BH.API.ActionFilters;

public class AddRequiredHeaderParameter: IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.Parameters == null)
        {
            operation.Parameters = new List<OpenApiParameter>();
        }

        operation.Parameters.Add(new OpenApiParameter()
        {
            Name = "UserId",
            In = ParameterLocation.Header,
            Required = false,
            Schema = new OpenApiSchema
            {
                Type = "String",
                Default = new OpenApiString(string.Empty)
            }
        });

        operation.Parameters.Add(new OpenApiParameter()
        {
            Name = "OrganizationId",
            In = ParameterLocation.Header,
            Required = false,
            Schema = new OpenApiSchema
            {
                Type = "integer",
                Default = new OpenApiString(string.Empty)
            }
        });

        operation.Parameters.Add(new OpenApiParameter()
        {
            Name = "UserName",
            In = ParameterLocation.Header,
            Required = false,
            Schema = new OpenApiSchema
            {
                Type = "String",
                Default = new OpenApiString(string.Empty)
            }
        });
    }
}