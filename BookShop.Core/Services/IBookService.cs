using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Paging;

namespace BookShop.Core.Services
{
    public interface IBookService
    {
        Task<List<Book>> GetAllBooksWithDetails();
        Task<PagedList<Book>> GetAllWithDetailsPagination(PagingParameters pagingParams);
        Task<Book> GetBookWithDetails(int id);
    }
}