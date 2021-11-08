import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from 'src/app/modules/shop/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
  }

  onSearchClick() {
    const search = this.searchTerm.nativeElement.value;
    console.log(search)
    this.shopService.setSearchQuery(search);
  }

}
