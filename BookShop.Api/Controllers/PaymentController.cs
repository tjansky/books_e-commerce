using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models.Basket;
using BookShop.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        // this endpoint will be called whenever user goes to payment section
        [HttpPost("CreateOrUpdatePaymentIntent")]
        public async Task<ActionResult<Basket>> CreateOrUpdatePaymentIntent([FromBody] Basket basket)
        {
            return await paymentService.CreateOrUpdatePaymentIntent(basket);
        }
    }
}