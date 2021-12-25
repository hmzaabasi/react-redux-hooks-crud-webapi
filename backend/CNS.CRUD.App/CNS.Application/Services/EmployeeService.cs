using CNS.Application.Dtos;
using CNS.Application.Interfaces;
using CNS.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CNS.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _employeeRepo;
        public EmployeeService(IRepository<Employee> employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        public async Task<Employee> CreateEmployee(EmployeeDto employee)
        {
            Employee emp = MapEmployeeDtoToEntity(employee);
            emp.ProfilePhotoPath = UploadFile(employee.ProfilePhoto);
            emp.PassportFilePath= UploadFile(employee.PassPort);
            return await _employeeRepo.Create(emp);
        }

        public async Task DeleteEmployee(int Id)
            => _employeeRepo.Delete(await GetEmployeeByUserId(Id));

        public async Task<IEnumerable<Employee>> GetAllEmployees()
            => await _employeeRepo.GetAll();

        public async Task<Employee> GetEmployeeByUserId(int Id)
        {
            var employee = await _employeeRepo.GetById(Id);
            if (employee == null) throw new KeyNotFoundException("Employee not found");

            return employee;
        }

        public async Task UpdateEmployee(EmployeeDto employee)
        {
            await GetEmployeeByUserId(employee.Id);
            Employee emp = MapEmployeeDtoToEntity(employee);
            emp.Id = employee.Id;
            emp.ProfilePhotoPath = UploadFile(employee.ProfilePhoto);
            emp.PassportFilePath = UploadFile(employee.PassPort);
            _employeeRepo.Update(emp);
        }

        private Employee MapEmployeeDtoToEntity(EmployeeDto employeeDto)
        {
            return new Employee
            {
                Location = employeeDto.Location,
                MobileNo = employeeDto.MobileNo,
                Name = employeeDto.Name,
                PassportExpiryDate = employeeDto.PassportExpiryDate,
                PassportNo = employeeDto.PassportNo,
                Designation = employeeDto.Designation,
                Email = employeeDto.Email,
                EmployeeType = (int) employeeDto.EmployeeType
            };
        }

        private string UploadFile(IFormFile file)
        {
            try
            {
                string fileServerPath = @"uploads\profileImages";
                var fileNameArr = Path.GetFileName(file.FileName).Split('.');
                string fileName = $"{fileNameArr[0]}_{Guid.NewGuid()}.{fileNameArr[1]}";
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), @$"wwwroot\{fileServerPath}");
                if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);

                using (FileStream stream = new FileStream(Path.Combine(filePath, fileName), FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return $"{fileServerPath}/{fileName}";
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}
