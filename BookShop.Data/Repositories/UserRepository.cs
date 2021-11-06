using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(BookShopDbContext context) : base(context)
        { 
            
        }

        public async Task<User> GetByIdWithWishlistedBooksAsync(int id)
        {
            return await BookShopDbContext.Users.Include(x => x.WishlistedBooks).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await BookShopDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}