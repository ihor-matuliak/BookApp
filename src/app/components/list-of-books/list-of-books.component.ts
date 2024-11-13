import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BooksService } from '../../shared/services/books.service';
import { Book } from '../../shared/models/book.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionBookDialogComponent } from '../description-book-dialog/description-book-dialog.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './list-of-books.component.html',
  styleUrl: './list-of-books.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class ListOfBooksComponent {
  public bookList$!: Observable<Book[]>;
  public searchQuery: string = '';

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.bookList$ = this.booksService.books$;
    
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.searchBooks();
    });
  }

  public readMore(book: Book): void {
    this.dialog.open(DescriptionBookDialogComponent, { data: book });
  }

  public removeBook(id: string): void {
    this.booksService.removeBook(id);
  }

  private searchBooks(): void {
    this.bookList$ = this.booksService.filterBooks(this.searchQuery);
  }
}
