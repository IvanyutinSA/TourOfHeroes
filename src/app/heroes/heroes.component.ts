import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';
import  { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
    NgIf,
    FormsModule,
    UpperCasePipe,
    HeroDetailComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = this.getHeroes();
  }

  getHeroes(): Observable<Hero[]> {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    return this.heroService.getHeroes();
  }

  ngOnInit(): void {
    // this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
