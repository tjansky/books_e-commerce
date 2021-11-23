import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: 'shop', loadChildren: () => import('./modules/shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule)},
  {path: 'basket', loadChildren: () => import('./modules/basket/basket.module').then(mod => mod.BasketModule)},
  {path: 'checkout', loadChildren: () => import('./modules/checkout/checkout.module').then(mod => mod.CheckoutModule), canActivate: [AuthGuard]},
  {path: 'wishlist', loadChildren: () => import('./modules/wishlist/wishlist.module').then(mod => mod.WishlistModule), canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'shop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
