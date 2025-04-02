import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedModule } from './shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [TodoComponent, HomeComponent],
  imports: [CommonModule, MaterialModule, RouterModule, TodoRoutingModule, SharedModule]
})
export class TodoModule {}
