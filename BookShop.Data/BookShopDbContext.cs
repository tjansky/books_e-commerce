using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using BookShop.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data
{
    public class BookShopDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Format> Formats { get; set; }
        public DbSet<User> Users { get; set; }


        public BookShopDbContext(DbContextOptions<BookShopDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .ApplyConfiguration(new BookConfiguration());
        }

    }
}