using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookShop.Api.Dtos;
using BookShop.Core.Models;
using BookShop.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class BookController : ControllerBase
    {
        private readonly IBookService bookService;
        private readonly IMapper mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            this.bookService = bookService;
            this.mapper = mapper;
        }

        [HttpGet("GetAllBooks")]
        public async Task<ActionResult<IEnumerable<BookWithDetailsDto>>> GetAllBooks()
        {
            var books = await bookService.GetAllBooksWithDetails();

            var booksDto = mapper.Map<IEnumerable<Book>, IEnumerable<BookWithDetailsDto>>(books);

            return Ok(booksDto);
        }

        [HttpGet("GetBookById/{id}")]
        public async Task<ActionResult<BookWithDetailsDto>> GetBookById(int id)
        {
            var book = await bookService.GetBookWithDetails(id);

            var bookDto = mapper.Map<Book, BookWithDetailsDto>(book);

            return Ok(bookDto);
        }
    }
}