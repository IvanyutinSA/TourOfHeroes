import { Component, ChangeDetectionStrategy, OnInit, Input, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { BehaviorSubject, EMPTY, Observable, tap, of, delay, concat } from 'rxjs';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { WindowComponent } from '../window/window.component';
import { WritableSignal, signal } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-authentication',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    NgIf,
    NgbDatepickerModule,
    ReactiveFormsModule
  ],
})

export class AuthenticationComponent implements OnInit {
  @Input() login$: Observable<string> = EMPTY;
  @Input() loginForm$: Observable<FormGroup> = of(new FormGroup({}));
  @Input() registerForm$: Observable<FormGroup> = EMPTY;
  logoutAction$: Observable<any> = EMPTY;
  loginAction$: Observable<any> = EMPTY;
  registerAction$: Observable<any> = EMPTY;
  error: number = 0;

  constructor(private authenticationService: AuthenticationService,
              private modalService: NgbModal) { }

  closeResult: WritableSignal<string> = signal('');

  open(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
    }

  ngOnInit(): void {
    this.getCurrentLogin();
    this.getLoginForm();
    this.getRegisterForm();
  }

  getLoginForm(): void {
    this.loginForm$ = of(
      new FormGroup({
        "login": new FormControl(''),
        "password": new FormControl('')
      }));
  }

  getRegisterForm(): void {
    this.registerForm$ = of(
      new FormGroup({
        "login": new FormControl('', Validators.required),
        "password": new FormControl('', Validators.required),
        "confirmedPassword": new FormControl('', Validators.required),
      })
    )
  }

  getCurrentLogin(): void {
    this.login$ = this.authenticationService.getLogin();
  }

  register(registerForm: FormGroup): Observable<any> {
    return this.authenticationService.addUser(registerForm).pipe(
      tap(res => {if (!res) this.error = 1}),
      tap(res => {if (res) {
        this.modalService.dismissAll();
        this.error = 0;
      }}));
  }

  setCurrentLogin(login: string): Observable<any> {
    return this.authenticationService.setCurrentLogin(login).pipe(
      tap(_ => this.getCurrentLogin()));
  }

  logout(): Observable<boolean> {
    return this.authenticationService.resetUserSession().pipe(
      (tap(_ => this.getCurrentLogin())
    ));
  }

  login(loginForm: FormGroup): Observable<string> {
    return this.authenticationService.login(loginForm).pipe(
      tap(res => {if (!res) this.error = 1}),
      tap(res => {if (res) {
        this.modalService.dismissAll();
        this.error = 0;
      }}),
      tap(_ => this.getCurrentLogin()));
  }

}
