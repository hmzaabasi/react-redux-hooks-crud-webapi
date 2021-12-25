using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CNS.Domain.Entities
{
    [Table("tblEmployee", Schema = "dbo")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public int EmployeeType { get; set; }
        public string Location { get; set; }
        public string PassportNo { get; set; }
        public DateTime PassportExpiryDate { get; set; }
        public string PassportFilePath { get; set; }
        public string ProfilePhotoPath { get; set; }
    }
}
