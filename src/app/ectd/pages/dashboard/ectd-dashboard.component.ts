import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ectd-dashboard',
  standalone:true,
  imports:[RouterModule],
  templateUrl: './ectd-dashboard.component.html',
  styleUrl: './ectd-dashboard.component.scss',
})

export class ECTDDashboardComponent  {
    constructor() {}
}
