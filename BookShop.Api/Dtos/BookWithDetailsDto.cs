using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Api.Dtos
{
    public class BookWithDetailsDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public string PublicationCity { get; set; }
        public string Language { get; set; }
        public int Stars { get; set; }

        public int AuthorId { get; set; }
        public virtual AuthorDto Author { get; set; }
        public int CategoryId { get; set; }
        public virtual CategoryDto Category { get; set; }
        public int FormatId { get; set; }
        public virtual FormatDto Format { get; set; }
    }
}