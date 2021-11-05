using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core;
using BookShop.Core.Models;
using BookShop.Core.Paging;
using BookShop.Core.Services;

namespace BookShop.Services
{
    public class BookService : IBookService
    {

        private readonly IUnitOfWork _unitOfWork;
        public BookService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<Book>> GetAllBooksWithDetails()
        {
            return await _unitOfWork.Books.GetAllWithDetailsAsync();
        }

        public async Task<PagedList<Book>> GetAllWithDetailsPagination(PagingParameters pagingParams)
        {
            return await _unitOfWork.Books.GetAllWithDetailsPaginationAsync(pagingParams);
        }

        public async Task<Book> GetBookWithDetails(int id)
        {
            return await _unitOfWork.Books.GetByIdWithDetailsAsync(id);
        }
    }
}