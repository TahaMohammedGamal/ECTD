import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth-services';
import { Configuration } from 'src/app/core/configurations/shared.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule, MatButtonModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private router: Router,
    private authService: AuthService) {}

  logout():void{
    this.authService.logout();
    this.router.navigateByUrl(
          `${Configuration.Auth.login}`
        );
  }
}
