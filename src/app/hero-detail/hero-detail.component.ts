import { Observable, tap, EMPTY } from 'rxjs';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AsyncPipe, NgIf, UpperCasePipe} from '@angular/common'
import {FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service'
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    NgIf,
    UpperCasePipe,
  ]
})
export class HeroDetailComponent implements OnInit {
  @Input() heroForm$: Observable<FormGroup> = EMPTY;
  submitAction$: Observable<void> = EMPTY;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.heroForm$ = this.getHeroForm();
  }

  getHeroForm(): Observable<FormGroup> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.heroService.getHeroForm(id);
  }

  goBack(): void {
    this.location.back();
  }

  submit(heroForm: FormGroup): Observable<void> {
    return this.heroService.updateHeroByForm(heroForm).pipe(
      tap(() => this.messageService.add(`${heroForm.value.name}`)),
      tap(() => this.goBack())
    );
  }
}
