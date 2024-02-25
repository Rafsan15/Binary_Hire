namespace BH.Models.ViewModels;

public class EvaluationModel
{
    public int ScreeningId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public double Match { get; set; }
    public string Location { get; set; }
    public string[] Education { get; set; }
    public int OrganizationId { get; set; }
    public double Experience { get; set; }
    public string[] Skills { get; set; }
}