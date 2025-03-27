using AztroWebApplication.Data;
using AztroWebApplication.Models;
using AztroWebApplication.Repositories;

namespace AztroWebApplication.Services
{
    public class UserService
    {
        private readonly UserRepository userRepository;
        private readonly AgeValidationService ageValidationService;

        public UserService(ApplicationDbContext context)
        {
            userRepository = new UserRepository(context);
            ageValidationService = new AgeValidationService(); 
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await userRepository.GetAllUsers();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await userRepository.GetUserById(id);
        }

        public async Task<User?> CreateUser(User user)
        {
            if (!ageValidationService.IsValidAge(user.Age))
            {
                return null; 
            }
            return await userRepository.CreateUser(user);
        }

        public async Task<User?> UpdateUserById(int id, User user)
        {
            return await userRepository.UpdateUserById(id, user);
        }

        public async Task<User?> DeleteUserById(int id)
        {
            return await userRepository.DeleteUserById(id);
        }
    }
}