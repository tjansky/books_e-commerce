using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookShop.Api.Dtos;
using BookShop.Core.Models;

namespace BookShop.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to Resource
            CreateMap<Book, BookWithDetailsDto>();
            CreateMap<Author, AuthorDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Format, FormatDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderItem, OrderItemDto>();
            
            // Resource to Domain
            CreateMap<CreateOrderDto, Order>();
            CreateMap<CreateOrderItemDto, OrderItem>();
        }
    }
}