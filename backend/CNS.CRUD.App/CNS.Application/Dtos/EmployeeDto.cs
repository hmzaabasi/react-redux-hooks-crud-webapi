using CNS.Application.Common.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace CNS.Application.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Designation { get; set; }

        [Required]
        public string MobileNo { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public EmployeeType EmployeeType { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string PassportNo { get; set; }
        
        [Required]
        public DateTime PassportExpiryDate { get; set; }

        [Required(ErrorMessage = "ProfilePhoto is required")]
        public IFormFile ProfilePhoto { get; set; }

        [FileExtensions(Extensions = "jpg,jpeg")]
        public string ProfilePhotoFileName => ProfilePhoto?.FileName;

        [Required(ErrorMessage = "Passport copy is required")]
        public IFormFile PassPort { get; set; }

        [FileExtensions(Extensions = "jpg,jpeg")]
        public string PassPortFileName => ProfilePhoto?.FileName;
    }
}
