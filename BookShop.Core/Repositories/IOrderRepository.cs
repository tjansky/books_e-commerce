using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<List<Order>> GetAllUserOrdersByEmailAsync(string email);
    }
}