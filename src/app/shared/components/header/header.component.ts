import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isDisabled = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isDisabled = this.router.url === '/register-book';
    });
  }

  public onSearch(event: any) {
    const query = event.target.value;
    this.router.navigate(['/home-page'], { queryParams: { search: query } });
  }

  public onCreateNewBook(): void {
    this.router.navigate(['/register-book']);
  }
}
