using System.ComponentModel.DataAnnotations;

namespace EmployeeTaskManagement.API.DTOs
{
    public class TaskCreateDto
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Priority { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public int EmployeeId { get; set; }
    }
}