import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/data/types/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

login(email: string, password: string) {
    return this.http.post<any>(`${environment.baseUrl}/Account/login`, { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('loggedUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}

  register(firstName: string, email: string, password: string, lastName = "placeholder") {
    return this.http.post<any>(`${environment.baseUrl}/Account/register`, { firstName, lastName, email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('loggedUser');
    this.currentUserSubject.next(null);
}

}
