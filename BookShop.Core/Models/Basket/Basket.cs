using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Core.Models.Basket
{
    public class Basket
    {
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
    }
}