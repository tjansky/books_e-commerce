using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Services
{
    public interface IUserService
    {
        Task<User> CreateUser(User user);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserByEmailWithWishlist(string email);
    }
}