using AztroWebApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace AztroWebApplication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } 
    }
}