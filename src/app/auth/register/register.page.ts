import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../user';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User;

  constructor(private  authService: AuthService, public  router: Router, public cookieService: CookieService) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = new User();
  }
  register() {
    console.log(this.user.username);
    this.authService.register(this.user).subscribe((res) => {
      this.cookieService.set('username', res.username);
      this.cookieService.set('emailAddress', res.emailAddress);
      window.location.reload();
    });
  }

  signin() {
    window.location.href = 'http://localhost:8100/signin';
  }
}
