import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TodoComponent } from './todo.component';

const routes: Route[] = [
  {
    path: '',
    component: TodoComponent,
    children: [
      {
        path: '',
        title: 'Home',
        component: HomeComponent
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
