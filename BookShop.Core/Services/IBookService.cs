using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Services
{
    public interface IBookService
    {
        Task<List<Book>> GetAllBooksWithDetails();
        Task<Book> GetBookWithDetails(int id);
    }
}