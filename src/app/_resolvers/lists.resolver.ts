import { User } from '../_models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/catch';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageSize = 5;
  pageNumber = 1;
  likesParam = 'Likers';

  constructor(private userService: UserService,
    private router: Router, private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null , this.likesParam).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/home']);
      return Observable.of(null);
    });
  }
}
