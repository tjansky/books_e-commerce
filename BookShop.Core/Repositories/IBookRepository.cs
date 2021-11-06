using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Paging;
using BookShop.Core.Sorting;

namespace BookShop.Core.Repositories
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<List<Book>> GetAllWithDetailsAsync();
        Task<PagedList<Book>> GetAllWithDetailsPaginationAsync(PagingParameters pagingParams, SortingParameters sortingParams, string search);
        Task<Book> GetByIdWithDetailsAsync(int id);
    }
}