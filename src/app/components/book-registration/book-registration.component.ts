import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BooksService } from '../../shared/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../shared/models/book.model';
import { isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-book-registration',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    CommonModule, 
  ],
  templateUrl: './book-registration.component.html',
  styleUrl: './book-registration.component.scss'
})
export class BookRegistrationComponent {
  public bookForm!: FormGroup;
  public bookImageUrl: string = '';
  
  public readonly isEditMode = signal(false);
  public readonly bookId = signal('');
  
  private readonly initFormValue = signal<Book>({} as Book)

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      yearOfPublic: new FormControl(null, [
        Validators.required,
        Validators.min(1700),
        Validators.max(new Date().getFullYear())
      ]),
      cover: new FormControl('https://static.vecteezy.com/system/resources/previews/022/058/960/non_2x/no-image-available-icon-vector.jpg', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id) {
        this.isEditMode.set(true);
        this.bookId.set(id);
        this.loadBookDetails(id);
      }
    });
  }

  public createBook(): void {
    if (this.isEditMode() && this.bookId()) {
      this.updateBook();
    } else {
      this.addNewBook();
    }
  }

  public removeBook(): void {
    this.booksService.removeBook(this.bookForm.get('id')?.value);
    this.router.navigate(['/home-page']);
  }

  public isSaveButtonDisabled(): boolean {
    return isEqual(this.initFormValue(), this.bookForm.getRawValue());
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.bookForm.get('cover')?.setValue(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  private loadBookDetails(id: string): void {
    const book = this.booksService.getBooks().find(b => b.id === id);
    if (book) {
      this.initFormValue.set({ ...book });
      this.bookForm.patchValue(book);
    }
  }

  private addNewBook(): void {
    const book = this.bookForm.value;
    book.id = uuidv4();
    this.booksService.addNewBook(book);
    this.router.navigate(['/home-page']);
  }

  private updateBook(): void {
    const updatedBook = this.bookForm.value;
    updatedBook.id = this.bookId();

    this.booksService.updateBook(this.bookId(), updatedBook);
    this.router.navigate(['/home-page']);
  }
}

