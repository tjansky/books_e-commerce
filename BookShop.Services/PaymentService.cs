using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core;
using BookShop.Core.Models.Basket;
using BookShop.Core.Services;
using Stripe;

namespace BookShop.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PaymentService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Basket> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = "sk_test_51JsueXEJ9ggCghiiy5QezhDiheLhfo87HY1Kjibtx86ZFsvfiNjBACJvD5CADTyn3n3k5EEXKWjSI7YNCRfHRz5900iArWKYEo";

            // check if prices for books are valid
            foreach (var item in basket.Items)
            {
                var book = await _unitOfWork.Books.GetByIdAsync(item.Id);
                if (item.Price != book.Price)
                {
                    item.Price = book.Price;
                }
            }

            var service = new PaymentIntentService();

            PaymentIntent intent;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    // stripe takes amount in long format so it has to be converted
                    Amount = (long) basket.Items.Sum(x => x.Quantity * (x.Price * 100)),
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> {"card"}
                };
                intent = await service.CreateAsync(options);

                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long) basket.Items.Sum(x => x.Quantity * (x.Price * 100))
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            return basket;
        }
    }
}