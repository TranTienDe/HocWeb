import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegistration } from 'src/app/interfaces/user-for-registration.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { PasswordConfirmationValidationService } from 'src/app/shared/services/password-confirmation-validation.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public registerForm!: FormGroup;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private repository: RepositoryService,
    private passwordConfirmValidator: PasswordConfirmationValidationService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    this.registerForm.get('confirm')?.setValidators(
      [
        Validators.required,
        this.passwordConfirmValidator.validateConfirmPassword(this.registerForm.get('password')!)
      ]
    );
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;

    const formValues = { ...registerFormValue };
    const user: UserForRegistration = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      clientURI: 'http://localhost:4200/authentication/emailconfirmation'
    };
    this.repository.create("api/user/registration", user)
      .subscribe(res => {
        console.log("Successful registration", res as UserForRegistration);
        this.router.navigate(["/authentication/login"]);
      },
        (error) => {
          this.errorMessage = error;
          this.showError = true;
        });
  }

}
