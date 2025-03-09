import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './ectd/shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ECTD';

constructor(){
  
}

}
