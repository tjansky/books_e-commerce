using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core;
using BookShop.Core.Models;
using BookShop.Core.Services;

namespace BookShop.Services
{
    public class FormatService : IFormatService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FormatService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Format>> GetAllFormats()
        {
            return await _unitOfWork.Formats.GetAllAsync();
        }

        public async Task<Format> GetFormatWithBooks(int id)
        {
            return await _unitOfWork.Formats.GetByIdWithBooksAsync(id);
        }
    }
}