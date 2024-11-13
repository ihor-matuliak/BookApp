import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListOfBooksComponent } from './components/list-of-books/list-of-books.component';
import { BookRegistrationComponent } from './components/book-registration/book-registration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home-page',
        component: ListOfBooksComponent
      },
      {
        path: 'register-book',
        component: BookRegistrationComponent
      },
      {
        path: 'edit-book/:id',
        component: BookRegistrationComponent
      }
    ]
  }
];
