using System.ComponentModel.DataAnnotations;
 
 public class CreateUserRequest
 {
     [Required]
     [StringLength(20)]
     public string? Name { get; set; }
 
     [Required]
     [MinLength(8)]
     public string? Email { get; set; }
     
     [Range(1, 80)]
     public int Age { get; set; }
 }