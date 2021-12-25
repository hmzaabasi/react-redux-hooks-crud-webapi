using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CNS.Application.Dtos;
using CNS.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CNS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService)
            => _employeeService = employeeService;

        [HttpPost]
        public async Task<object> Create([FromForm] EmployeeDto employee)
        {
            try
            {
                var createdEmployee = await _employeeService.CreateEmployee(employee);
                return Ok(new { Success = true, data = createdEmployee.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, message = ex.Message });
            }
        }
        [HttpDelete]
        public async Task<object> Delete(int Id)
        {
            try
            {
                await _employeeService.DeleteEmployee(Id);
                return Ok(new { Success = true });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, message = ex.Message });
            }
        }

        [HttpPut]
        public async Task<object> Update([FromForm] EmployeeDto employee)
        {
            try
            {
                await _employeeService.UpdateEmployee(employee);
                return Ok(new { Success = true });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, message = ex.Message });
            }
        }

        [HttpGet("GetAll")]
        public async Task<object> GetAll()
            => await _employeeService.GetAllEmployees();

        [HttpGet]
        public async Task<object> Get(int Id)
        {
            try
            {
                return Ok(new { Success = true, data = await _employeeService.GetEmployeeByUserId(Id) });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, message = ex.Message });
            }
        }
    }
}
