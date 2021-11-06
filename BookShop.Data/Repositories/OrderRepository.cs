using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Core.Repositories;

namespace BookShop.Data.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(BookShopDbContext context) : base(context)
        { 
            
        }
        
    }
}