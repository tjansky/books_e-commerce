using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(BookShopDbContext context) : base(context)
        { 
            
        }

        public async Task<List<Order>> GetAllUserOrdersByEmailAsync(string email)
        {
            return await BookShopDbContext.Orders.Include(x => x.OrderItems).Where(y => y.BuyerEmail == email).ToListAsync();
        }

        private BookShopDbContext BookShopDbContext
        {
            get { return Context as BookShopDbContext; }
        }
    }
}