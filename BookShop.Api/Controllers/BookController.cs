using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookShop.Api.Dtos;
using BookShop.Core.Models;
using BookShop.Core.Paging;
using BookShop.Core.Services;
using BookShop.Core.Sorting;
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
        public async Task<ActionResult<BooksWithPagination>> GetAllBooks([FromQuery] PagingParameters pagingParams,
                                                                         [FromQuery] SortingParameters sortingParams,
                                                                         [FromQuery] string search)
        {
            PagedList<Book> pagedBooks = await bookService.GetAllWithDetailsPagination(pagingParams, sortingParams, search);

            ICollection<BookWithDetailsDto> booksDto = mapper.Map<ICollection<Book>, ICollection<BookWithDetailsDto>>(pagedBooks);

            PaginationDto pagination = new PaginationDto 
            {
                TotalPages = pagedBooks.TotalPages,
                PageSize = pagedBooks.PageSize,
                CurrentPage = pagedBooks.CurrentPage,
                TotalCount = pagedBooks.TotalCount
            };

            var jobsWithPagination = new BooksWithPagination {Books = booksDto, Pagination = pagination}; 

            return Ok(jobsWithPagination);
        }


        [HttpGet("GetBookById/{id}")]
        public async Task<ActionResult<BookWithDetailsDto>> GetBookById(int id)
        {
            var book = await bookService.GetBookWithDetails(id);

            var bookDto = mapper.Map<Book, BookWithDetailsDto>(book);

            return Ok(bookDto);
        }

        [HttpGet("GetUserWishlist")]
        public async Task<ActionResult<List<BookWithDetailsDto>>> GetWishlistOfUser()
        {
            var userId = 2;
            
            var wishListBooks = await bookService.GetUserWishlist(userId);

            var wishListBooksDto = mapper.Map<List<Book>, List<BookWithDetailsDto>>(wishListBooks);

            return wishListBooksDto;
        }
    }
}