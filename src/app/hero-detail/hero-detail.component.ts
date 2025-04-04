import { Component, Input, OnInit } from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common'
import {FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {Hero} from '../hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service'

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    UpperCasePipe,
  ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  @Input() heroForm?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getHeroForm();
  }

  getHeroForm(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroForm(id)
      .subscribe(heroForm => this.heroForm = heroForm);
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
