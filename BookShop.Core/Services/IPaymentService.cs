using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models.Basket;

namespace BookShop.Core.Services
{
    public interface IPaymentService
    {
        Task<Basket> CreateOrUpdatePaymentIntent(Basket basket);
    }
}