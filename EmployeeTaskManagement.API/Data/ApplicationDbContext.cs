using Microsoft.EntityFrameworkCore;
using EmployeeTaskManagement.API.Models;
namespace EmployeeTaskManagement.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        public DbSet<Employee> Employees { get; set; }
        
        public DbSet<TaskItem> Tasks { get; set; }
    
    }
}