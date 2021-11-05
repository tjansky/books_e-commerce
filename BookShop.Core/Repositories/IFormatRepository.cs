using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Repositories
{
    public interface IFormatRepository : IRepository<Format>
    {
        Task<Format> GetByIdWithBooksAsync(int id);
    }
}