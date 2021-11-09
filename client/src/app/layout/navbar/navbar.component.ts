import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/data/types/user';
import { ShopService } from 'src/app/modules/shop/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  loggedUser: User;

  constructor(private shopService: ShopService, private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
   }

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

  onSignOut() {
    this.authService.logout();
  }

  onSignIn() {
    this.router.navigateByUrl("/account/login");
  }

}
