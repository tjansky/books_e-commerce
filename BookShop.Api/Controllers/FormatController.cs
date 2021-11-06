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
    public class FormatController : ControllerBase
    {
        private readonly IFormatService formatService;
        private readonly IMapper mapper;

        public FormatController(IFormatService formatService, IMapper mapper)
        {
            this.formatService = formatService;
            this.mapper = mapper;
        }

        [HttpGet("GetAllFormats")]
        public async Task<ActionResult<IEnumerable<FormatDto>>> GetAllFormats()
        {
            var formats = await formatService.GetAllFormats();

            var formatsDto = mapper.Map<IEnumerable<Format>,IEnumerable<FormatDto>>(formats);

            return Ok(formatsDto);
        }
    }
}