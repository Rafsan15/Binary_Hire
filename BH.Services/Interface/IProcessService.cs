using BH.Models;
using BH.Models.ViewModels;


namespace BH.Services.Interface
{
    public interface IProcessService
    {
        Task<string> ProcessResult(CVInputModel input);

    }
 }




