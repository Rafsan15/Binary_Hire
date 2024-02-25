using System;
using System.ComponentModel.DataAnnotations;

namespace BH.Models.ViewModels
{
    public class JobFavModel
    {
        [Range(1, int.MaxValue)]
		public System.Int32 OrganizationId { get; set;}
    }
    public class UpdateJobFavModel
    {
        [Range(1, int.MaxValue)]
        public System.Int32 JobId { get; set;}
        public System.Boolean IsFav { get; set;}
        public System.Int32 ModifiedBy { get; set;}
    }
}

