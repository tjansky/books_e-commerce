using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Core.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public string ShipToFirstName { get; set; }
        public string ShipToLastName { get; set; }
        public string ShipToStreet { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToZipcode { get; set; }
        public decimal SubTotal { get; set; }
        public string Status { get; set; }
        public string PaymentIntendId { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}