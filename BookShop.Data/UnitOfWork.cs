using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core;
using BookShop.Core.Repositories;
using BookShop.Data.Repositories;

namespace BookShop.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BookShopDbContext _context;
        private AuthorRepository _authorRepository;
        private BookRepository _bookRepository;
        private CategoryRepository _categoryRepository;
        private FormatRepository _formatRepository;
        private UserRepository _userRepository;
        private OrderRepository _orderRepository;

        public UnitOfWork(BookShopDbContext context)
        {
            this._context = context;
        }

        public IAuthorRepository Authors => _authorRepository ?? new AuthorRepository(_context);

        public IBookRepository Books => _bookRepository ?? new BookRepository(_context);

        public ICategoryRepository Categories => _categoryRepository ?? new CategoryRepository(_context);

        public IFormatRepository Formats => _formatRepository ?? new FormatRepository(_context);

        public IUserRepository Users => _userRepository ?? new UserRepository(_context);
        public IOrderRepository Orders => _orderRepository ?? new OrderRepository(_context);

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}