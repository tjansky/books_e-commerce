import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/modules/shop/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
  }

  onSearchClick() {
    const search = this.searchTerm.nativeElement.value;
    const currentRoute = this.router.url; 

    console.log("User from route: " + currentRoute + " searching books with: " + search);

    // if user search for books and he is not on "/shop" route, navigate him there
    if (currentRoute !== "/shop") {
      console.log("User not on shop route while searching for books, navigating him to /shop");
      this.router.navigateByUrl("/shop");
    }

    this.shopService.setSearchQuery(search);
  }

}
