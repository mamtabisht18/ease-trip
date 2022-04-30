import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';

const routes: Routes = [
  {
    path: 'book',
    component: BookTicketsComponent
  },
  {
    path: 'list',
    loadChildren: () => import('./components/list-tickets/list-tickets.module').then((module) => module.ListTicketsModule)
  },
  {
    path: '**',
    redirectTo: '/book'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
