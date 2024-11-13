import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BookList } from '../data/books.data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private localStoreKey = 'list-of-books';
  private booksSubject = new BehaviorSubject<Book[]>(this.getInitBooks());

  public books$ = this.booksSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  private getInitBooks(): Book[] {
    const storedBooks = localStorage.getItem(this.localStoreKey);
    
    return storedBooks ? JSON.parse(storedBooks) : BookList;
  }

  public getBooks(): Book[] {
    return this.booksSubject.getValue();
  }

  public filterBooks(query: string): Observable<Book[]> {
    if (!query.trim()) {
      return this.books$;
    }
    return this.books$.pipe(
      map(books => books.filter(book => 
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  public addNewBook(book: Book): void {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem(this.localStoreKey, JSON.stringify(books));
    this.booksSubject.next(books);
    this.showToastMessage(`The book was successfully added!`)
  }

  public updateBook(id: string, updatedBook: Book): void {
    const books = this.getBooks().map(book => {
      if (book.id === id) {
        return updatedBook;
      }
      return book;
    });

    localStorage.setItem(this.localStoreKey, JSON.stringify(books));
    this.booksSubject.next(books);
    this.showToastMessage(`The book was successfully updated!`)
  }

  public removeBook(id: string): void {
    const books = this.getBooks().filter(book => book.id !== id);
    localStorage.setItem(this.localStoreKey, JSON.stringify(books));
    this.booksSubject.next(books);
    this.showToastMessage(`The book was successfully removed!`)
  }

  private showToastMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
