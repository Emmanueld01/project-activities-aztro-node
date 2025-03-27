using AztroWebApplication.Models;
using AztroWebApplication.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;

namespace AztroWebApplication.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext context)
        {
            dbContext = context;
        }

        // Methods

        // Get all users
        public async Task<List<User>> GetAllUsers()
        {
            return await dbContext.Users.ToListAsync();
        }

        // Get a user by its ID
        public async Task<User?> GetUserById(int id)
        {
            return await dbContext.Users.FirstOrDefaultAsync(user => user.Id == id); 
        }

        // Create a user
        public async Task<User> CreateUser(User user)
        {
            var newUser = dbContext.Users.Add(user); 
            await dbContext.SaveChangesAsync();
            return newUser.Entity;
        }

        // update a user by their ID
        public async Task<User?> UpdateUserById(int id, User user)
        {
            var userToUpdate = await this.GetUserById(id);
            if (userToUpdate == null) return null;

            user.Id = userToUpdate.Id;
            var userUpdated = UpdateObject(userToUpdate, user);

            dbContext.Users.Update(userUpdated); 
            await dbContext.SaveChangesAsync();
            return userToUpdate;
        }

        private static T UpdateObject<T>(T current, T newObject)
        {
            foreach (PropertyInfo prop in typeof(T).GetProperties())
            {
                var newValue = prop.GetValue(newObject);

                if (newValue == null || string.IsNullOrEmpty(newValue.ToString()))
                    continue;

                if (newValue is int intValue && intValue == 0)
                    continue;

                prop.SetValue(current, newValue);
            }
            return current;
        }

        // Delete a user by their ID
        public async Task<User?> DeleteUserById(int id)
        {
            var userToDelete = await this.GetUserById(id);
            if (userToDelete == null) return null;

            dbContext.Users.Remove(userToDelete); 
            await dbContext.SaveChangesAsync();
            return userToDelete;
        }
    }
}