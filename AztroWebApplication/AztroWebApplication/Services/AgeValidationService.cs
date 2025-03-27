using System;

namespace AztroWebApplication.Services
{
    public class AgeValidationService
    {
        private const int MinAge = 18;
        private const int MaxAge = 80;

        public bool IsValidAge(int age)
        {
            return age >= MinAge && age <= MaxAge;
        }

        public string GetAgeValidationMessage(int age)
        {
            if (age < MinAge)
            {
                return $"Age must be at least {MinAge} years old.";
            }
            else if (age > MaxAge)
            {
                return $"Age must not exceed {MaxAge} years old.";
            }
            return string.Empty; 
        }
    }
}