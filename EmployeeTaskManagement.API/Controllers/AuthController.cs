using EmployeeTaskManagement.API.Data;
using EmployeeTaskManagement.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using EmployeeTaskManagement.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeTaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher = new();
        private readonly IConfiguration _configuration;
        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
{
    // Step 1: Check password and confirm password
    if (request.Password != request.ConfirmPassword)
    {
        return BadRequest(new { message = "Passwords do not match." });
    }

    // Step 2: Password validation
    string pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$";

    if (!Regex.IsMatch(request.Password, pattern))
    {
        return BadRequest(new
        {
            message = "Password must be at least 8 characters and contain uppercase, lowercase and a number."
        });
    }

    // Step 3: Check if email already exists
    bool emailExists = await _context.Users.AnyAsync(u => u.Email == request.Email);

    if (emailExists)
    {
        return BadRequest(new { message = "Email already exists." });
    }

    // Step 4: Create User object
    User user = new User
    {
        FullName = request.FullName,
        Email = request.Email,
        Role = request.Role
    };
    user.Password = _passwordHasher.HashPassword(user, request.Password);

    // Step 5: Save to database
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    // Step 6: Return success
    return Ok(new
    {
        message = "Registration successful."
    });
}

    //Login
  [HttpPost("login")]
public async Task<IActionResult> Login(LoginRequest request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == request.Email);

    if (user == null)
    {
        return Unauthorized(new
        {
            message = "Invalid email or password."
        });
    }

    var result = _passwordHasher.VerifyHashedPassword(
        user,
        user.Password,
        request.Password
    );

    if (result == PasswordVerificationResult.Failed)
    {
        return Unauthorized(new
        {
            message = "Invalid email or password."
        });
    }

   var token = GenerateJwtToken(user);

return Ok(new
{
    token,
    fullName = user.FullName,
    email = user.Email,
    role = user.Role
});
}

   //Jwt token
 private string GenerateJwtToken(User user)
{
    var jwtSettings = _configuration.GetSection("Jwt");

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(jwtSettings["Key"]!)
    );

    var credentials = new SigningCredentials(
        key,
        SecurityAlgorithms.HmacSha256
    );

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.FullName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        issuer: jwtSettings["Issuer"],
        audience: jwtSettings["Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(
            Convert.ToDouble(jwtSettings["ExpiryInMinutes"])
        ),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}


   //logout
   [Authorize]
[HttpPost("logout")]
public IActionResult Logout()
{
    return Ok(new
    {
        message = "Logout successful"
    });
}

    }
}