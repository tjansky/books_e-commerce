using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookShop.Data.Configurations
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder
                .HasKey(m => m.Id);

            builder
                .Property(m => m.Id)
                .UseIdentityColumn();

            builder
                .HasOne(m => m.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(m => m.AuthorId);

            builder
                .HasOne(m => m.Category)
                .WithMany(a => a.Books)
                .HasForeignKey(m => m.CategoryId);

            builder
                .HasOne(m => m.Format)
                .WithMany(a => a.Books)
                .HasForeignKey(m => m.FormatId);

            builder
                .HasMany(m => m.UsersThatWishlisted)
                .WithMany(a => a.WishlistedBooks);

            builder
                .ToTable("Books");
        }
    }
}