using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Paging;
using BookShop.Core.Repositories;
using BookShop.Core.Sorting;
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

        public Task<PagedList<Book>> GetAllWithDetailsPaginationAsync(PagingParameters pagingParams, SortingParameters sortingParams, string search)
        {
            IQueryable<Book> query = BookShopDbContext.Books.Include(x => x.Format).Include(x => x.Category).Include(x => x.Author);

            // if search string i set apply search to result
            if (!String.IsNullOrEmpty(search))
            {
                // it searches by name of book and author
                query = query.Where(x => x.DisplayName.Contains(search) || x.Author.DisplayName.Contains(search));
            }

            // if category id is not set to 0 apply category filter
            if (sortingParams.CategoryId != 0)
            {
                query = query.Where(y => y.CategoryId == sortingParams.CategoryId);
            }

            // if format id is not set to 0 apply format filter
            if (sortingParams.FormatId != 0)
            {
                query = query.Where(y => y.FormatId == sortingParams.FormatId);
            }

            // if author id is not set to 0 apply author filter
            if (sortingParams.AuthorId != 0)
            {
                query = query.Where(y => y.AuthorId == sortingParams.AuthorId);
            }

            return Task.FromResult(PagedList<Book>
                    .GetPagedList(query, pagingParams.PageNumber, pagingParams.PageSize));
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}