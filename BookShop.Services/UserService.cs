using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core;
using BookShop.Core.Models;
using BookShop.Core.Services;

namespace BookShop.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<User> CreateUser(User user)
        {
            await _unitOfWork.Users.AddAsync(user);

            await _unitOfWork.CommitAsync();
            
            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _unitOfWork.Users.GetUserByEmailAsync(email);
        }

        public async Task<User> GetUserByEmailWithWishlist(string email)
        {
            return await _unitOfWork.Users.GetUserByEmailWithWishlistAsync(email);
        }
    }
}