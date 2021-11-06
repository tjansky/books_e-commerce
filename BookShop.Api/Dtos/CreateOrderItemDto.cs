using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Api.Dtos
{
    public class CreateOrderItemDto
    {
        public int BookId { get; set; }
        // public string BookName { get; set; }
        // public string PictureUrl { get; set; }
        // public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}