import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-description-book-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule
  ],
  templateUrl: './description-book-dialog.component.html',
  styleUrl: './description-book-dialog.component.scss'
})
export class DescriptionBookDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private router: Router,
    private matDialogRef: MatDialogRef<DescriptionBookDialogComponent>,
  ) {}

  public editBook(id: string): void {
    this.matDialogRef.close();
    this.router.navigate(['/edit-book', id]);
  }
}
