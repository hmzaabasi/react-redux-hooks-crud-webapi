using CNS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CNS.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
            => base.OnModelCreating(builder);

        public DbSet<Employee> Employees { get; set; }
    }
}
