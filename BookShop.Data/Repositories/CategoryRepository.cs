using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(BookShopDbContext context) : base(context)
        { 
            
        }

        public async Task<Category> GetByIdWithBooksAsync(int id)
        {
            return await BookShopDbContext.Categories.Include(x => x.Books).FirstOrDefaultAsync(x => x.Id == id);
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}