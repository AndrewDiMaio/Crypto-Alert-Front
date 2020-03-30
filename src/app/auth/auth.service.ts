import { Injectable } from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Signup} from './signup';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private verifyUrl: string;
  private readonly userUrl: string;
  private currentUser: string;
  private signupurl: string;

  constructor(private http: HttpClient) {
    this.userUrl = environment.apiUrl + 'users/add';
    this.verifyUrl = environment.apiUrl + 'users/verify';
    this.signupurl = environment.apiUrl + 'signup';
    this.currentUser = ' ';
  }

  register(user: User) {
    return this.http.post<User>(this.userUrl, user);
    }

  public verifyUser(user: User) {
    return this.http.post<User>(this.verifyUrl, user);
  }

  signUpAlerts(signup: Signup) {
    console.log(signup.emailAddress + signup.pair);
    return this.http.post<Signup>(this.signupurl, signup);
  }

  getSubsByEmail(emailAddress: string): Observable<string[]> {
    console.log(this.signupurl + '/' + emailAddress);
    return this.http.get<string[]>(this.signupurl + '/' + emailAddress);
  }

  checkEmailForPair(emailAddress: string, pair: string): Observable<boolean> {
    console.log(this.signupurl + '/' + emailAddress);
    return this.http.get<boolean>(this.signupurl + '/' + emailAddress + '/' + pair);
  }

  unsub(emailAddress: string, pair: string) {
    console.log(this.signupurl + '/delete/' + emailAddress + '/' + pair);
    return this.http.delete(this.signupurl + '/delete/' + emailAddress + '/' + pair);
  }
}
