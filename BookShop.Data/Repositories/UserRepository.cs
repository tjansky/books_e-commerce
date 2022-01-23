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
            return await BookShopDbContext.Users
                    .Include(x => x.WishlistedBooks).ThenInclude(x => x.Format)
                    .Include(x => x.WishlistedBooks).ThenInclude(x => x.Category)
                    .Include(x => x.WishlistedBooks).ThenInclude(x => x.Author)
                    .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await BookShopDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> GetUserByEmailWithWishlistAsync(string email)
        {
            return await BookShopDbContext.Users
                    .Include(x => x.WishlistedBooks).ThenInclude(x => x.Format)
                    .Include(x => x.WishlistedBooks).ThenInclude(x => x.Category)
                    .Include(x => x.WishlistedBooks).ThenInclude(x => x.Author)
                    .FirstOrDefaultAsync(x => x.Email == email);
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}