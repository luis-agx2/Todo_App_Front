import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [TodoComponent, HomeComponent, ProfileComponent],
  imports: [CommonModule, MaterialModule, RouterModule, TodoRoutingModule, SharedModule, ReactiveFormsModule]
})
export class TodoModule {}
