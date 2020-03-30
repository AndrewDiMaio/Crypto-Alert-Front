import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User;
  public returnUser: User;
  public newUser = false;

  constructor(private  authService: AuthService, public cookieService: CookieService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    this.authService.verifyUser(this.user).subscribe(data => {
      this.returnUser = data;
      console.log(this.returnUser);
      if (this.returnUser !== null) {
        console.log(this.returnUser.id);
        this.cookieService.set('username', String(this.returnUser.username));
        this.cookieService.set('emailAddress', String(this.returnUser.emailAddress));
        window.location.reload();
      } else {
        this.cookieService.deleteAll();
        alert('Invalid user and/or password');
        window.location.pathname = ('login');
      }
    });
    console.log(this.returnUser);
  }

  register() {
    this.newUser = true;
  }
}
