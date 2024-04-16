using BH.Models.ViewModels;

namespace BH.Models.ResponseModels;

public class WorkflowResponseModel
{
    public WorkflowMasterResponseModel WorkflowMaster { get; set; }
    public List<WorkflowDetailResponseModel> WorkflowDetailResponseModel { get; set; }
}