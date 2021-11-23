using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core;
using BookShop.Core.Models;
using BookShop.Core.Services;

namespace BookShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Order> CreateOrder(Order orderFromClient)
        {
            // get books from book repo and create order items
            var orderItemsToAdd = new List<OrderItem>();
            foreach (var orderItem in orderFromClient.OrderItems)
            {
                var book = await _unitOfWork.Books.GetByIdAsync(orderItem.BookId);
                var newOrderItem = new OrderItem{
                    BookId = book.Id,
                    BookName = book.DisplayName,
                    PictureUrl = book.Image,
                    Price = book.Price,
                    Quantity = orderItem.Quantity,
                };
                orderItemsToAdd.Add(newOrderItem);
            }

            // calculate subtotal
            var subtotal = orderItemsToAdd.Sum(item => item.Price * item.Quantity);


            // check if order with same PaymentIntendId exists and delete it 
            // TODO

            
            // create order
            var orderToAdd = new Order{
                BuyerEmail = orderFromClient.BuyerEmail,
                OrderDate = DateTime.Now,
                ShipToFirstName = orderFromClient.ShipToFirstName,
                ShipToLastName = orderFromClient.ShipToLastName,
                ShipToStreet = orderFromClient.ShipToStreet,
                ShipToCity = orderFromClient.ShipToCity,
                ShipToZipcode = orderFromClient.ShipToZipcode,
                SubTotal = subtotal,
                Status = "Pending",
                OrderItems = orderItemsToAdd,
                PaymentIntendId = orderFromClient.PaymentIntendId
            };

            // save to db
            await _unitOfWork.Orders.AddAsync(orderToAdd);
            var result = await _unitOfWork.CommitAsync();

            if(result <= 0) return null;

            // return order
            return orderToAdd;
        }

        public async Task<List<Order>> GetAllUserOrdersByEmail(string email)
        {
            return await _unitOfWork.Orders.GetAllUserOrdersByEmailAsync(email);
        }

        public async Task<Order> GetOrder(int id)
        {
            return await _unitOfWork.Orders.GetByIdAsync(id);
        }

        public async Task<Order> GetOrderWithOrderItemsById(int id)
        {
            return await _unitOfWork.Orders.GetOrderWithOrderItemsByIdAsync(id);
        }

        public async Task<Order> UpdateOrderStatus(Order orderToBeUpdated)
        {
            orderToBeUpdated.Status = "Successful";

            await _unitOfWork.CommitAsync();

            return orderToBeUpdated;
        }
    }
}