import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angularWS');
}
