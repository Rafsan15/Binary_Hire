// See https://aka.ms/new-console-template for more information

using System.Text;
using BH.CodeGen.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RazorLight;

var basePath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.Parent;
var currentDirectory = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent;
var settingsJson = File.ReadAllText(currentDirectory + "/Settings.json");
var settings = JsonConvert.DeserializeObject<Settings>(settingsJson);

// Create a RazorLight engine
var engine = new RazorLightEngineBuilder()
    .UseMemoryCachingProvider()
    .Build();

// Load the Razor template
var modelFile = File.ReadAllText(currentDirectory+"/Templates/Code/Entity.cshtml");
var responseFile = File.ReadAllText(currentDirectory+"/Templates/Code/EntityResponse.cshtml");
var irepoFile = File.ReadAllText(currentDirectory + "/Templates/Code/IEntityRepo.cshtml");
var repoFile = File.ReadAllText(currentDirectory + "/Templates/Code/EntityRepo.cshtml");
var iserviceFile = File.ReadAllText(currentDirectory + "/Templates/Code/IEntityService.cshtml");
var serviceFile = File.ReadAllText(currentDirectory + "/Templates/Code/EntityService.cshtml");

var saveSqlFile = File.ReadAllText(currentDirectory + "/Templates/StoredProcedures/EntitySave.cshtml");
var selectByIdFile = File.ReadAllText(currentDirectory + "/Templates/StoredProcedures/EntitySelectById.cshtml");
var selectSqlFile = File.ReadAllText(currentDirectory + "/Templates/StoredProcedures/EntitySelect.cshtml");


// Render the Razor template
var modelResult = await engine.CompileRenderStringAsync("modelKey", modelFile, settings);
var responseResult = await engine.CompileRenderStringAsync("entityKey", responseFile, settings);
var irepoResult = await engine.CompileRenderStringAsync("irepoKey", irepoFile, settings);
var repoResult = await engine.CompileRenderStringAsync("repoKey", repoFile, settings);
var iserviceResult = await engine.CompileRenderStringAsync("iserviceKey", iserviceFile, settings);
var serviceResult = await engine.CompileRenderStringAsync("serviceKey", serviceFile, settings);

var saveSqlResult = await engine.CompileRenderStringAsync("saveSqlKey", saveSqlFile, settings);
var selectByIdResult = await engine.CompileRenderStringAsync("selectByIdKey", selectByIdFile, settings);
var selectSqlResult = await engine.CompileRenderStringAsync("selectSqlKey", selectSqlFile, settings);

// Save the generated C# class to a .cs file
File.WriteAllText(basePath+"/BH.Models/ViewModels/"+ $"{settings.ClassName}Model.cs", modelResult, Encoding.UTF8);
File.WriteAllText(basePath+"/BH.Models/ResponseModels/"+ $"{settings.ClassName}ResponseModel.cs", responseResult, Encoding.UTF8);
File.WriteAllText(basePath + "/BH.Repositories/Interface/" + $"I{settings.RepoName}.cs", irepoResult, Encoding.UTF8);
File.WriteAllText(basePath + "/BH.Repositories/" + $"{settings.RepoName}.cs", repoResult, Encoding.UTF8);
File.WriteAllText(basePath + "/BH.Services/Interface/" + $"I{settings.ServiceName}.cs", iserviceResult, Encoding.UTF8);
File.WriteAllText(basePath + "/BH.Services/" + $"{settings.ServiceName}.cs", serviceResult, Encoding.UTF8);

// Save the generated C# file to a .sql file
File.WriteAllText(basePath + "/DBScript/StoredProcedures/" + $"Save{settings.ClassName}.sql", saveSqlResult, Encoding.UTF8);
File.WriteAllText(basePath + "/DBScript/StoredProcedures/" + $"Select{settings.ClassName}ById.sql", selectByIdResult, Encoding.UTF8);
File.WriteAllText(basePath + "/DBScript/StoredProcedures/" + $"Select{settings.ClassName}.sql", selectSqlResult, Encoding.UTF8);