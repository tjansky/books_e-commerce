using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Api.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
    }
}