using EmployeeTaskManagement.API.Data;
using EmployeeTaskManagement.API.DTOs;
using EmployeeTaskManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EmployeeTaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create Task
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskCreateDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Employee? employee = await _context.Employees.FindAsync(request.EmployeeId);

            if (employee == null)
            {
                return BadRequest(new
                {
                    message = "Employee not found."
                });
            }

            if (request.DueDate < request.StartDate)
            {
                return BadRequest(new
                {
                    message = "Due Date cannot be earlier than Start Date."
                });
            }

            TaskItem task = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                Priority = request.Priority,
                Status = "Pending",
                StartDate = request.StartDate,
                DueDate = request.DueDate,
                EmployeeId = request.EmployeeId
            };

            _context.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Task created successfully."
            });
        }

        // Get All Tasks
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetTasks(
            string? search,
            string? sortBy,
            string? sortOrder,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.Tasks
                .Include(t => t.Employee)
                .AsQueryable();

             string? role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (role == "Employee")
            {
               string? email = User.FindFirst(ClaimTypes.Email)?.Value;

                query = query.Where(t => t.Employee!.Email == email);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(t =>
                    t.Title.Contains(search) ||
                    t.Description.Contains(search) ||
                    t.Priority.Contains(search) ||
                    t.Status.Contains(search) ||
                    t.Employee!.Name.Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                bool ascending = sortOrder?.ToLower() != "desc";

                switch (sortBy.ToLower())
                {
                    case "title":
                        query = ascending
                            ? query.OrderBy(t => t.Title)
                            : query.OrderByDescending(t => t.Title);
                        break;

                    case "priority":
                        query = ascending
                            ? query.OrderBy(t => t.Priority)
                            : query.OrderByDescending(t => t.Priority);
                        break;

                    case "status":
                        query = ascending
                            ? query.OrderBy(t => t.Status)
                            : query.OrderByDescending(t => t.Status);
                        break;

                    case "duedate":
                        query = ascending
                            ? query.OrderBy(t => t.DueDate)
                            : query.OrderByDescending(t => t.DueDate);
                        break;

                    default:
                        query = query.OrderBy(t => t.Id);
                        break;
                }
            }

            int totalRecords = await query.CountAsync();

            var tasks = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.Description,
                    t.Priority,
                    t.Status,
                    t.StartDate,
                    t.DueDate,
                    t.EmployeeId,
                    EmployeeName = t.Employee!.Name
                })
                .ToListAsync();

            return Ok(new
            {
                totalRecords,
                page,
                pageSize,
                data = tasks
            });
        }

        // Get Task By Id
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _context.Tasks
                .Include(t => t.Employee)
                .Where(t => t.Id == id)
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.Description,
                    t.Priority,
                    t.Status,
                    t.StartDate,
                    t.DueDate,
                    t.EmployeeId,
                    EmployeeName = t.Employee!.Name
                })
                .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound(new
                {
                    message = "Task not found."
                });
            }

            return Ok(task);
        }

        // Update Task
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskUpdateDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TaskItem? task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new
                {
                    message = "Task not found."
                });
            }
            if (task.Status == "Completed")
            {
                return BadRequest(new
                {
                   message = "Completed tasks cannot be edited."
                });
            }

            Employee? employee = await _context.Employees.FindAsync(request.EmployeeId);

            if (employee == null)
            {
                return BadRequest(new
                {
                    message = "Employee not found."
                });
            }

            if (request.DueDate < request.StartDate)
            {
                return BadRequest(new
                {
                    message = "Due Date cannot be earlier than Start Date."
                });
            }

            task.Title = request.Title;
            task.Description = request.Description;
            task.Priority = request.Priority;
            task.Status = request.Status;
            task.StartDate = request.StartDate;
            task.DueDate = request.DueDate;
            task.EmployeeId = request.EmployeeId;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Task updated successfully."
            });
        }

        // Delete Task
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            TaskItem? task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new
                {
                    message = "Task not found."
                });
            }

            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Task deleted successfully."
            });
        }

// Update Task Status
[Authorize]
[HttpPut("{id}/status")]
public async Task<IActionResult> UpdateTaskStatus(int id, UpdateTaskStatusDto request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var task = await _context.Tasks
        .Include(t => t.Employee)
        .FirstOrDefaultAsync(t => t.Id == id);

    if (task == null)
    {
        return NotFound(new
        {
            message = "Task not found."
        });
    }

    string? role = User.FindFirst(ClaimTypes.Role)?.Value;
    string? email = User.FindFirst(ClaimTypes.Email)?.Value;

    // Employee can update only their own tasks
    if (role == "Employee")
    {
        if (task.Employee == null || task.Employee.Email != email)
        {
            return Forbid();
        }
    }

    // Validate Status
    if (request.Status != "Pending" &&
        request.Status != "In Progress" &&
        request.Status != "Completed")
    {
        return BadRequest(new
        {
            message = "Invalid status."
        });
    }

    task.Status = request.Status;

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Task status updated successfully."
    });
}
    }
}