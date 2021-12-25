using CNS.Application.Dtos;
using CNS.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CNS.Application.Interfaces
{
    public interface IEmployeeService
    {
        public Task<Employee> CreateEmployee(EmployeeDto employee);
        public Task<Employee> GetEmployeeByUserId(int Id);
        public Task<IEnumerable<Employee>> GetAllEmployees();
        public Task UpdateEmployee(EmployeeDto employee);
        public Task DeleteEmployee(int Id);
    }
}
