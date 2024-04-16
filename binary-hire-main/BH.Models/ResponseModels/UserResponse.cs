using BH.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Models.ResponseModels
{
    public class UserResponse : UserModel
    {
        public string? OrganizationName { get; set; }
    }
}
