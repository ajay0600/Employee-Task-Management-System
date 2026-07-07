using EmployeeTaskManagement.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeTaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetReports()
        {
            var completedTasks = await _context.Tasks
                .Include(t => t.Employee)
                .Where(t => t.Status == "Completed")
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.Priority,
                    t.DueDate,
                    EmployeeName = t.Employee!.Name
                })
                .ToListAsync();

            var pendingTasks = await _context.Tasks
                .Include(t => t.Employee)
                .Where(t => t.Status == "Pending")
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.Priority,
                    t.DueDate,
                    EmployeeName = t.Employee!.Name
                })
                .ToListAsync();

            var employeeWiseTasks = await _context.Employees
                .Select(e => new
                {
                    EmployeeName = e.Name,
                    TotalTasks = e.Tasks.Count,
                    CompletedTasks = e.Tasks.Count(t => t.Status == "Completed"),
                    PendingTasks = e.Tasks.Count(t => t.Status == "Pending")
                })
                .ToListAsync();

            return Ok(new
            {
                completedTasks,
                pendingTasks,
                employeeWiseTasks
            });
        }
    }
}