using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Repositories
{
    public interface IAuthorRepository : IRepository<Author>
    {
        Task<Author> GetByIdWithBooksAsync(int id);
    }
}