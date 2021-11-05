using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Repositories
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<List<Book>> GetAllWithDetailsAsync();
        Task<Book> GetByIdWithDetailsAsync(int id);
    }
}