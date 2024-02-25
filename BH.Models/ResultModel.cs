using System;
namespace BH.Models
{
    public class ResultModel<T>
    {
        public T? Data { get; set; }
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public IEnumerable<string>? ErrorMessages { get; set; }
    }
}

