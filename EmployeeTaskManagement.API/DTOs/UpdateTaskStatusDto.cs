using System.ComponentModel.DataAnnotations;

namespace EmployeeTaskManagement.API.DTOs
{
    public class UpdateTaskStatusDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}