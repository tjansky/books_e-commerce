using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Core.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public string PublicationCity { get; set; }
        public string Language { get; set; }

        public int AuthorId { get; set; }
        public virtual Author Author { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public int FormatId { get; set; }
        public virtual Format Format { get; set; }
        public virtual ICollection<User> UsersThatWishlisted { get; set; }

    }
}