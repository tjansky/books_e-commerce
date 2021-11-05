using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Core.Models
{
    public class Format
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}