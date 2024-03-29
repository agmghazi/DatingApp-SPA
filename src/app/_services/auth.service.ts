import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class AuthService {
  baseUrl = 'https://localhost:5001/api/auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  jwtHelper: JwtHelper = new JwtHelper();
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  // tslint:disable-next-line: deprecation
  constructor(private http: Http) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  login(model: any) {
    // tslint:disable-next-line: deprecation
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        this.currentUser = user.user;
        this.userToken = user.tokenString;
        if (this.currentUser.photoUrl !== null) {
          this.changeMemberPhoto(this.currentUser.photoUrl);
        } else {
          this.changeMemberPhoto('../../assets/user.png');
        }
      }
    }).catch(this.handleError);
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user, this.requestOptions()).catch(this.handleError);
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  private requestOptions() {
    // tslint:disable-next-line: deprecation
    const headers = new Headers({ 'Content-type': 'application/json' });
    // tslint:disable-next-line: deprecation
    return new RequestOptions({ headers: headers });
  }
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }
}
