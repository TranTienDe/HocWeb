import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorMessage: string = '';

  constructor(private router: Router, private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = this.handleError(error);
          return throwError(errorMessage);
        })
      )
  }

  public handleError = (error: HttpErrorResponse): string => {
    if (error.status === 500) {
      return this.handle500Error(error);
    }
    else if (error.status === 403) {
      return this.handleForbidden(error);
    }
    else if (error.status === 404) { //notFound
      return this.handle404Error(error)
    }
    else if (error.status === 401) {
      return this.handleUnauthorized(error);
    }
    else if (error.status === 400) {
      return this.handleBadRequest(error);
    }
    else {
      return this.handleOtherError(error);
    }
  }

  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
    return error.message;
  }

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
    return error.message;
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if (this.router.url.startsWith('/authentication/login')) {
      return error.error.errorMessage;
    }
    else {
      this.authService.sendAuthStateChangeNotification(false);
      this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: this.router.url } });
      return error.message;
    }
  }

  private handleForbidden = (error: HttpErrorResponse) => {
    this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url } });
    return "Forbidden";
  }

  private handleBadRequest = (error: HttpErrorResponse) => {
    if (this.router.url === '/authentication/register') {
      let message = '';
      const values = Object.values(error.error.errors);
      values.map((m: unknown) => {
        message += m + '<br>';
      })
      return message.slice(0, -4);
    }

    this.router.navigate(["/authentication/login"], { queryParams: { returnUrl: this.router.url } });
    return this.createErrorMessage(error);
  }

  private handleOtherError = (error: HttpErrorResponse) => {
    return this.createErrorMessage(error);
  }

  private createErrorMessage = (error: HttpErrorResponse) => {
    return this.errorMessage = error.error ? error.error : error.statusText;
  }

}
