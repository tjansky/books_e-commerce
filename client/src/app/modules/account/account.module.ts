import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
