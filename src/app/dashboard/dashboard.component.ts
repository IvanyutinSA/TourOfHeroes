import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = this.getHeroes();
  }

  ngOnInit(): void {
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }
}
