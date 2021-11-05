using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data.Repositories
{
    public class BookRepository : Repository<Book>, IBookRepository
    {
        public BookRepository(DbContext context) : base(context)
        {
        }

        public async Task<List<Book>> GetAllWithDetailsAsync()
        {
            return await BookShopDbContext.Books
                    .Include(x => x.Format)
                    .Include(x => x.Category)
                    .Include(x => x.Author)
                    .ToListAsync();
        }

        public async Task<Book> GetByIdWithDetailsAsync(int id)
        {
            return await BookShopDbContext.Books
                    .Include(x => x.Format)
                    .Include(x => x.Category)
                    .Include(x => x.Author)
                    .FirstOrDefaultAsync(x => x.Id == id);
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}