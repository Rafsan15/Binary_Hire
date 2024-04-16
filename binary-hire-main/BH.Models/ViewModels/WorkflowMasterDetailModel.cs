namespace BH.Models.ViewModels;

public class WorkflowMasterDetailModel
{
    public WorkflowMasterModel WorkflowMaster { get; set; }
    public List<WorkflowDetailModel> WorkflowDetail { get; set; }
}

public class WorkflowMasterDetailRequestModel
{
    public WorkflowMasterRequestModel WorkflowMaster { get; set; }
    public List<WorkflowDetailRequestModel> WorkflowDetail { get; set; }
}