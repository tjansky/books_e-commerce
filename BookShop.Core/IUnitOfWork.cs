using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Repositories;

namespace BookShop.Core
{
    public interface IUnitOfWork : IDisposable
    {
        IAuthorRepository Authors { get; }
        IBookRepository Books { get; }
        ICategoryRepository Categories { get; }
        IFormatRepository Formats { get; }
        IUserRepository Users { get; }
        IOrderRepository Orders { get; }
        Task<int> CommitAsync();
    }
}