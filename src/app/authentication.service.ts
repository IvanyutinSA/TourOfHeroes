import { FormGroup } from '@angular/forms';
import { UserData } from './user-data';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, delay, of, tap } from 'rxjs';
import { sha256 } from 'js-sha256';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private messageService: MessageService) { }

  getLogin(): Observable<string> {
    var login = localStorage.getItem("currentLogin");
    return of(login ? login : '').pipe(
      tap(_ => this.log("login was fetched")),
      delay(200),
      catchError(this.handleError<string>("Error")));
  }

  login(loginForm: FormGroup): Observable<string> {
    const login = loginForm.value.login;
    const password = loginForm.value.password;
    const userData = localStorage.getItem("userData");
    const passwordHash = sha256(password).toString();
    if (userData) {
      const parsedData = JSON.parse(userData);
      const okey = parsedData.find((obj: UserData) => {
        return obj.login === login && obj.password === passwordHash
      });
      if (okey) {
        return this.setCurrentLogin(login);
      }
    }
    return of('');
  }

  setCurrentLogin(login: string): Observable<any> {
    return of({}).pipe(
      tap(() => localStorage.setItem('currentLogin', login)),
      delay(200),
      tap(_ => this.log("Login was setted")),
      catchError(this.handleError<string>("Error"))
    );
  }

  addUser(registerGroup: FormGroup): Observable<string> {
    const login = registerGroup.value.login;
    const password = registerGroup.value.password;
    const confirmedPassword = registerGroup.value.confirmedPassword;
    const userData = localStorage.getItem("userData");
    var IsRegistered = false;
    if (userData) {
      const parsedData = JSON.parse(userData);
      IsRegistered = parsedData.find((obj: UserData) => {
        return obj.login === login;
      });
    }
    if (IsRegistered || password !== confirmedPassword) {
      return of('');
    }
    const hashed_password = sha256(password).toString();
    const newUser = {
      login: login,
      password: hashed_password
    } as UserData;
    return of(login).pipe(
      tap(() => this.addUserToLocalStorage(newUser)),
      tap(() => this.setCurrentLogin(login)),
      delay(200),
    );
  }

  addUserToLocalStorage(userInfo: UserData): void {
    var userData = localStorage.getItem("userData");
    var parsedUserData = []
    if (userData) {
      parsedUserData = JSON.parse(userData);
    }
    parsedUserData.push(userInfo);
    localStorage.setItem("userData", JSON.stringify(parsedUserData));
  }

  resetUserSession(): Observable<any> {
    return this.setCurrentLogin('');
  }

  private log(message: string) {
    this.messageService.add(`AuthenticationService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
