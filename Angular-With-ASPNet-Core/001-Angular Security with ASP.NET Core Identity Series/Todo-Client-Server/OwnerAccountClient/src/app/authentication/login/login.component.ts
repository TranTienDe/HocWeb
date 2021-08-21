import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AuthResponse } from 'src/app/interfaces/auth-response.model';
import { ExternalAuth } from 'src/app/interfaces/external-auth';
import { UserForAuthentication } from 'src/app/interfaces/user-for-authentication.model';
import { UserForRegistration } from 'src/app/interfaces/user-for-registration.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  private _returnUrl: string = '';

  public email: string = '';
  public password: string = '';


  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private repository: RepositoryService,
    private authService: AuthenticationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    console.log('login ngOnInit.');
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this._returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';

    this.email = localStorage.getItem('email') ?? '';
    this.password = localStorage.getItem('password') ?? '';
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthentication = {
      email: login.username,
      password: login.password,
      clientURI: 'http://localhost:4200/authentication/forgotpassword'
    };

    this.authService.loginUser('api/user/login', userForAuth)
      .subscribe(res => {
        if (res.is2StepVerificationRequired) {
          this.router.navigate(['/authentication/twostepverification'],
            { queryParams: { returnUrl: this._returnUrl, provider: res.provider, email: userForAuth.email } });
        } else {
          var authResponse = res as AuthResponse;
          localStorage.setItem('token', authResponse.token);
          localStorage.setItem('email', userForAuth.email);
          localStorage.setItem('password', userForAuth.password);

          this.authService.sendAuthStateChangeNotification(authResponse.isAuthSuccessful);
          this.router.navigate([this._returnUrl]);
        }
      }, (error) => {
        this.errorMessage = error;
        this.showError = true;
      });
  }

  public externalLogin = () => {
    this.showError = false;
    this.authService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      console.log(user);
      const externalAuth: ExternalAuth = {
        provider: user.provider,
        idToken: user.idToken
      }
      this.validateExternalAuth(externalAuth);
    }, error => {
      console.log(error);
      this.authService.signOutExternal();
    });
  }

  private validateExternalAuth(externalAuth: ExternalAuth) {
    this.authService.externalLogin('api/user/externallogin', externalAuth)
      .subscribe(res => {
        localStorage.setItem("token", res.token);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this._returnUrl]);
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
        this.authService.signOutExternal();
      });
  }


}
