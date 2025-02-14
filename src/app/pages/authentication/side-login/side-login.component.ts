import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { UserRequestModel } from 'src/app/ectd/domain/usecases/request-response/request';
import { DataResponse, UserResponseModel } from 'src/app/ectd/domain/usecases/request-response/response';
import { LoginUsecase } from 'src/app/ectd/domain/usecases/login.usecase';
import { AuthService } from 'src/app/services/auth-services';
import { Configuration } from 'src/app/core/configurations/shared.config';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginUsecase:LoginUsecase,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let loginRequest = {
        email: this.form.value.email!,
        password: this.form.value.password!
      } as UserRequestModel;


      this.loginUsecase.login(loginRequest).subscribe((res:UserResponseModel) => {
        if (res) {
          this.authService.saveLoginedUser(res);
            this.navigateToValidate();
        } 
      },
        (err:any) => {
          //this._toastrService.error(JSON.stringify(err));
        });
    }
  }

  private navigateToValidate(): void {
    this.router.navigateByUrl(
      `${Configuration.modules.validate}`
    );
  }
}
