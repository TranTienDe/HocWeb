import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/interfaces/forgot-password.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PasswordConfirmationValidationService } from 'src/app/shared/services/password-confirmation-validation.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm!: FormGroup;
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = '';
  private _token: string = '';
  private _email: string = '';

  constructor(
    private authService: AuthenticationService,
    private passConfValidator: PasswordConfirmationValidationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });

    this.resetPasswordForm.get('confirm')?.setValidators(
      [Validators.required, this.passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password')!)]
    );

    this._token = this.route.snapshot.queryParams['token'];
    this._email = this.route.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;

    const resetPass = { ... resetPasswordFormValue };
    const resetPassDto: ResetPassword = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this._token,
      email: this._email
    }

    this.authService.resetPassword('api/user/resetpassword', resetPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
    },
    (error) => {
      this.showError = true;
      this.errorMessage = error.error;
    })
  }

}
