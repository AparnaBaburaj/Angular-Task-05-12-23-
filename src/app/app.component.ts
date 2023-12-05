import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers:[TestService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-task';

  http=inject(HttpClient);
  
  data: any;
  error: string | undefined;

  constructor(private dataService: TestService) {}

  ngOnInit() {}

  getData() {
    this.dataService.getData().subscribe(
      (response) => {
        this.data = response;
        this.error = undefined;
      },
      (error) => {
        this.error = 'An error occurred. Please try again later.';
        this.data = undefined;
      }
    );
  }
}
