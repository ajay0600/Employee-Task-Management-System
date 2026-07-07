using EmployeeTaskManagement.API.Data;
using EmployeeTaskManagement.API.DTOs;
using EmployeeTaskManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeTaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        //create Employee
       [Authorize(Roles = "Admin")]
       [HttpPost]
public async Task<IActionResult> CreateEmployee(EmployeeCreateDto request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    bool emailExists = await _context.Employees
        .AnyAsync(e => e.Email == request.Email);

    if (emailExists)
    {
        return BadRequest(new
        {
            message = "Employee email already exists."
        });
    }

    Employee employee = new Employee
    {
        Name = request.Name,
        Email = request.Email,
        Department = request.Department,
        Designation = request.Designation
    };

    _context.Employees.Add(employee);

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Employee created successfully."
    });
}
       
        //get
       [Authorize]
       [HttpGet]
public async Task<IActionResult> GetEmployees(string? search, string? sortBy,
    string? sortOrder, int page = 1,int pageSize = 10 )
{
    var query = _context.Employees.AsQueryable();

    if (!string.IsNullOrWhiteSpace(search))
    {
        query = query.Where(e =>
            e.Name.Contains(search) ||
            e.Email.Contains(search) ||
            e.Department.Contains(search) ||
            e.Designation.Contains(search));
    }
     if (!string.IsNullOrWhiteSpace(sortBy))
{
    bool ascending = sortOrder?.ToLower() != "desc";

    switch (sortBy.ToLower())
    {
        case "name":
            query = ascending
                ? query.OrderBy(e => e.Name)
                : query.OrderByDescending(e => e.Name);
            break;

        case "department":
            query = ascending
                ? query.OrderBy(e => e.Department)
                : query.OrderByDescending(e => e.Department);
            break;

        case "designation":
            query = ascending
                ? query.OrderBy(e => e.Designation)
                : query.OrderByDescending(e => e.Designation);
            break;

        default:
            query = query.OrderBy(e => e.Id);
            break;
    }
}

   int totalRecords = await query.CountAsync();


    var employees = await query
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();

    return Ok(new
{
    totalRecords,
    page,
    pageSize,
    data = employees
});
}

    //update Employee
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
public async Task<IActionResult> UpdateEmployee(int id, EmployeeUpdateDto request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    Employee? employee = await _context.Employees.FindAsync(id);

    if (employee == null)
    {
        return NotFound(new
        {
            message = "Employee not found."
        });
    }

    bool emailExists = await _context.Employees
        .AnyAsync(e => e.Email == request.Email && e.Id != id);

    if (emailExists)
    {
        return BadRequest(new
        {
            message = "Employee email already exists."
        });
    }

    employee.Name = request.Name;
    employee.Email = request.Email;
    employee.Department = request.Department;
    employee.Designation = request.Designation;

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Employee updated successfully."
    });
}


  //Delete Employee
  [Authorize(Roles = "Admin")]
  [HttpDelete("{id}")]
public async Task<IActionResult> DeleteEmployee(int id)
{
    Employee? employee = await _context.Employees.FindAsync(id);

    if (employee == null)
    {
        return NotFound(new
        {
            message = "Employee not found."
        });
    }

    _context.Employees.Remove(employee);

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Employee deleted successfully."
    });
}

        //tasks
        [HttpGet("{id}/tasks")]
public async Task<ActionResult<Employee>> GetEmployeeTasks(int id)
{
    var employee = await _context.Employees
        .Include(e => e.Tasks)
        .FirstOrDefaultAsync(e => e.Id == id);

    if (employee == null)
    {
        return NotFound();
    }

    return employee;
}

    }
}