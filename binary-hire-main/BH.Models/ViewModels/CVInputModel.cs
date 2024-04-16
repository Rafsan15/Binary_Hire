using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Models.ViewModels
{
    public class CVInputModel
    {
        public int JobPostId { get; set; }
        public int WorkflowId { get; set; }
        public int UserId { get; set; }
        public string? FileDirectory { get; set; }
    }

    public class CVInputPythonModel
    {
        public string Directory { get; set; }
    }
}
