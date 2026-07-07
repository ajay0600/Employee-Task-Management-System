using EmployeeTaskManagement.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EmployeeTaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            string? role = User.FindFirst(ClaimTypes.Role)?.Value;

            //admin            
            if (role == "Admin")
            {
                var totalEmployees = await _context.Employees.CountAsync();

                var totalTasks = await _context.Tasks.CountAsync();

                var pendingTasks = await _context.Tasks
                    .CountAsync(t => t.Status == "Pending");

                var inProgressTasks = await _context.Tasks
                    .CountAsync(t => t.Status == "In Progress");

                var completedTasks = await _context.Tasks
                    .CountAsync(t => t.Status == "Completed");

                return Ok(new
                {
                    role = "Admin",

                    totalEmployees,
                    totalTasks,
                    pendingTasks,
                    inProgressTasks,
                    completedTasks
                });
            }

            //Employee

            string? email = User.FindFirst(ClaimTypes.Email)?.Value;

            var employeeTasks = _context.Tasks
                .Include(t => t.Employee)
                .Where(t => t.Employee!.Email == email);

            var totalTasksEmployee = await employeeTasks.CountAsync();

            var pendingTasksEmployee = await employeeTasks
                .CountAsync(t => t.Status == "Pending");

            var inProgressTasksEmployee = await employeeTasks
                .CountAsync(t => t.Status == "In Progress");

            var completedTasksEmployee = await employeeTasks
                .CountAsync(t => t.Status == "Completed");

            return Ok(new
            {
                role = "Employee",

                totalTasks = totalTasksEmployee,
                pendingTasks = pendingTasksEmployee,
                inProgressTasks = inProgressTasksEmployee,
                completedTasks = completedTasksEmployee
            });
        }
    }
}