import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getLogin(): Observable<string> {
    var login = localStorage.getItem("login");
    return of(login ? login : '');
  }

  addUser(login: string, password: string, confirmedPassword): Observable<any> {
  }
}
