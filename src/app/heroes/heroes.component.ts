import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';
import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { Observable, EMPTY, tap } from 'rxjs';

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
  heroes$: Observable<Hero[]> = EMPTY;
  addAction$: Observable<any> = EMPTY;
  deleteAction$: Observable<any> = EMPTY;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroes$ = this.heroService.getHeroes();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): Observable<any> {
    name = name.trim();
    if (!name) {
      EMPTY;
    }
    return this.heroService.addHero({ name } as Hero)
            .pipe(tap(()=>this.getHeroes()));
  }

  delete(hero: Hero): Observable<any> {
    return this.heroService.deleteHero(hero.id)
            .pipe(tap(()=>this.getHeroes()));
  }
}
