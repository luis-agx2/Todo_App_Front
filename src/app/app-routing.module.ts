import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
  {
    path: 'welcome',
    title: 'Welcome',
    component: WelcomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule)
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
