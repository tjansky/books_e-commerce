using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data.Repositories
{
    public class AuthorRepository : Repository<Author>, IAuthorRepository
    {
        public AuthorRepository(BookShopDbContext context) : base(context)
        { 
            
        }

        public async Task<Author> GetByIdWithBooksAsync(int id)
        {
            return await BookShopDbContext.Authors.Include(x => x.Books).FirstOrDefaultAsync(x => x.Id == id);
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}