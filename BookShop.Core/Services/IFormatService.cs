using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;

namespace BookShop.Core.Services
{
    public interface IFormatService
    {
        Task<IEnumerable<Format>> GetAllFormats();
        Task<Format> GetFormatWithBooks(int id);
    }
}