using System;
using System.ComponentModel.DataAnnotations;

namespace BH.Models
{
	public class PaginationModelBase : SearchFilterModelBase
	{
        [Range(1, int.MaxValue)]
        public int? Page { get; set; }
        [Range(1, int.MaxValue)]
        public int? PageSize { get; set; }
    }
}

