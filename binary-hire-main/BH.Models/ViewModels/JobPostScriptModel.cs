namespace BH.Models.ViewModels;

public class JobPostScriptModel
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string EmploymentStatus { get; set; }
    public string JobLocation { get; set; }
    public string Qualification { get; set; }
    public string[] Skills { get; set; }
    public int MinExperience { get; set; }
    public int MaxExperience { get; set; }
}