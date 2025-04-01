import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { GenericsModule } from '../generics/shared.module';
import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, GenericsModule, ReactiveFormsModule]
})
export class AuthModule {}
