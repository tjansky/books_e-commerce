using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrder(Order order);
        Task<List<Order>> GetAllUserOrdersByEmail(string email);
        Task<Order> UpdateOrderStatus(Order orderToBeUpdated);
        Task<Order> GetOrder(int id);
        Task<Order> GetOrderWithOrderItemsById(int id);
    }
}