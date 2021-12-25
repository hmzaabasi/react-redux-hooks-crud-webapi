using CNS.Application.Interfaces;
using CNS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CNS.Persistence.Repositories
{
    public class EmployeeRepository : IRepository<Employee>
    {
        ApplicationDbContext _dbContext;
        public EmployeeRepository(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }
        public async Task<Employee> Create(Employee _object)
        {
            var objEmployee = await _dbContext.Employees.AddAsync(_object);
            _dbContext.SaveChanges();
            return objEmployee.Entity;
        }

        public void Update(Employee _object)
        {
            _dbContext.Employees.Update(_object);
            _dbContext.SaveChanges();
        }

        public void Delete(Employee _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public async Task<IEnumerable<Employee>> GetAll()
            => await _dbContext.Employees.AsNoTracking().ToListAsync();

        public async Task<Employee> GetById(int Id)
            => await _dbContext.Employees.AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
        
    }
}
