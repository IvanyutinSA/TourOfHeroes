import { Observable } from 'rxjs';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common'
import {FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {Hero} from '../hero'
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
    FormsModule,
    NgIf,
    UpperCasePipe,
  ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  @Input() heroForm?: FormGroup;
  @Input() heroForm$: Observable<FormGroup>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService,
  ) {
    this.heroForm$ = this.getHeroForm();
  }

  ngOnInit(): void {
    this.getHeroForm();
  }

  getHeroForm(): Observable<FormGroup> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroForm(id)
      .subscribe(heroForm => this.heroForm = heroForm);
    return this.heroService.getHeroForm(id);
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  submit(): void {
    if (this.heroForm) {
      this.heroService.updateHeroByForm(this.heroForm).subscribe();
      this.messageService.add(`${this.heroForm.value.race}`);
    }
  }
}
