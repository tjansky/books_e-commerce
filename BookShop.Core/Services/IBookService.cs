using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Paging;
using BookShop.Core.Sorting;

namespace BookShop.Core.Services
{
    public interface IBookService
    {
        Task<List<Book>> GetAllBooksWithDetails();
        Task<PagedList<Book>> GetAllWithDetailsPagination(PagingParameters pagingParams, SortingParameters sortingParams, string search);
        Task<Book> GetBookWithDetails(int id);
        Task<List<Book>> GetUserWishlist(int userId);
        Task<Book> AddBookToUserWishlist(User user, Book book);
    }
}