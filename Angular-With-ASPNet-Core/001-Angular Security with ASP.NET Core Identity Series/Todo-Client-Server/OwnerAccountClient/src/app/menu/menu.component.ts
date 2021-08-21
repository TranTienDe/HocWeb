import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public isExternalAuth: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    });

    this.socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })
  }

  public logout = () => {
    this.authService.logout();

    if (this.isExternalAuth)
      this.authService.signOutExternal();

    this.router.navigate(["/"]);
  }

}
