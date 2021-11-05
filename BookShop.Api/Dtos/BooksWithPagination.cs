using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Api.Dtos
{
    public class BooksWithPagination
    {
        public ICollection<BookWithDetailsDto> Books { get; set; }
        public PaginationDto Pagination { get; set; }
    }
}