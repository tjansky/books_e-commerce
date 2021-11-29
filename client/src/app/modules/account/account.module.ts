import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [AccountComponent, LoginComponent, RegisterComponent],
  imports: [
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
