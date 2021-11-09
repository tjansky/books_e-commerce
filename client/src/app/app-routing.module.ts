import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'shop', loadChildren: () => import('./modules/shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule)},
  {path: 'basket', loadChildren: () => import('./modules/basket/basket.module').then(mod => mod.BasketModule)},
  {path: '**', redirectTo: 'shop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
