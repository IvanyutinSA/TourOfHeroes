import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})

export class AuthenticationComponent implements OnInit {
  login$: Observable<string> = EMPTY;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    localStorage.setItem('login', 'pudge');
    this.getLogin();
  }

  getLogin(): void {
    this.login$ = this.authenticationService.getLogin();
  }

  loginAction(login: string, firstPassword: string,
              secondPassword: string): void {
    this.authenticationService.addLogin(login, firstPassword, secondPassword);
  }
}
