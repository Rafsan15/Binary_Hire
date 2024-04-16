namespace BH.Models.ViewModels;

public class ResumeParserModel
{
    public string name { get; set; }
    public string email { get; set; }
    public string mobile_number { get; set; }
    public string[] skills { get; set; }
    public string[] college_name { get; set; }
    public string[] degree { get; set; }
    public string[] designation { get; set; }
    public string[] experience { get; set; }
    public string[] company_names { get; set; }
    public int no_of_pages { get; set; }
    public double total_experience { get; set; }
}