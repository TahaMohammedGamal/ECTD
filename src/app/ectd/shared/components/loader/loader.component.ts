import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone:true,
    imports:[
        CommonModule,
      MatProgressSpinnerModule ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Input() isLoading: boolean = false; // Input property to control visibility

  constructor(private loaderService: LoaderService) {
    // Subscribe to the loader state
    this.loaderService.isLoading$.subscribe((state) => {
      this.isLoading = state;
      if (state) {
        document.body.classList.add('disabled'); // Disable body content
      } else {
        document.body.classList.remove('disabled'); // Enable body content
      }
    });
  }

}