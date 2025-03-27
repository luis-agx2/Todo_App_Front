import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, SharedModule, ReactiveFormsModule]
})
export class AuthModule {}
