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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            this.categoryService = categoryService;
            this.mapper = mapper;
        }

        [HttpGet("GetAllCategories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
        {
            var categories = await categoryService.GetAllCategories();

            var categoriesDto = mapper.Map<IEnumerable<Category>,IEnumerable<CategoryDto>>(categories);

            return Ok(categoriesDto);
        }
    }
}