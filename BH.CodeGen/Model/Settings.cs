using System;
namespace BH.CodeGen.Model
{
	public class Settings
	{
        public string? ClassName { get; set; }
        public string? RepoName { get; set; }
        public string? ServiceName { get; set; }
        public List<PropertyDefinition>? Properties { get; set; }
        public string? ResultModel { get; set; }
    }
}

