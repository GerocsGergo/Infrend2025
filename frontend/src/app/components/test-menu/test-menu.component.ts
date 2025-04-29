import { Component, inject, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { UserDTO } from '../../../../models';

@Component({
  selector: 'app-test-menu',
  imports: [],
  templateUrl: './test-menu.component.html',
  styleUrl: './test-menu.component.css'
})
export class TestMenuComponent implements OnInit{

  testService = inject(TestService);

  user: UserDTO | null = null;


  ngOnInit() {
    this.testService.getOneUser(1).subscribe({
      next: (user) =>this.user = user,
      error: (err) => {
        console.error('Failed to load user:', err);
      }
    });
  }
}
