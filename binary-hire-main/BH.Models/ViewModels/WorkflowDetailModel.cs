namespace BH.Models.ViewModels;

public class WorkflowDetailModel : ModelBase
{
    public int WorkflowMasterId { get; set; }
    public int WorkflowTypeId { get; set; }
    public int Priority { get; set; }
}

public class WorkflowDetailRequestModel : RequestModelBase
{
    public int WorkflowMasterId { get; set; }
    public int WorkflowTypeId { get; set; }
    public int Priority { get; set; }
}