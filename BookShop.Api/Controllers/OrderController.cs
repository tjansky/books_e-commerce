using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookShop.Api.Dtos;
using BookShop.Core.Models;
using BookShop.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
        {
            string email = "kupac1@gmail.com"; // email will be retrived from user claim

            var orderToAdd = mapper.Map<CreateOrderDto, Order>(createOrderDto);

            orderToAdd.BuyerEmail = email;

            Order addedOrder = await orderService.CreateOrder(orderToAdd);

            if (addedOrder == null) return BadRequest("Something went wrong while creating order");

            var orderDto = mapper.Map<Order, OrderDto>(addedOrder);

            return orderDto;
        }

        [HttpGet("GetAllUserOrders")]
        public async Task<ActionResult<List<OrderDto>>> GetAllUserOrders() 
        {
            string email = "kupac1@gmail.com"; // email will be retrived from user claim

            var orders = await orderService.GetAllUserOrdersByEmail(email);

            var ordersDto = mapper.Map<List<Order>, List<OrderDto>>(orders);

            return ordersDto;
        }

        [HttpPut("UpdateOrderStatus/{orderId}")]
        public async Task<ActionResult> UpdateOrderStatus(int orderId)
        {
            // get order that will be updated
            var orderToBeUpdated = await orderService.GetOrder(orderId);

            // TODO - make some kind of check if payment really happened
            // -----------------------

            // change status of order to success
            var updatedOrder = await orderService.UpdateOrderStatus(orderToBeUpdated);

            return Ok(updatedOrder);
        }
    }
}