using BH.Models.ViewModels;

namespace BH.Models.ResponseModels;

public class JobPostResponse:JobPostModel
{
    public string JobTypeName { get; set; }
    public string WorkPlaceName { get; set; }
    public string StatusName { get; set; }
    public string Note { get; set; }
}