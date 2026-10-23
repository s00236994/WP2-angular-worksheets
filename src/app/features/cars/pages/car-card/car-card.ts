import { Component, input } from '@angular/core';
import { Car } from '../../models/car.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink],
  templateUrl: './car-card.html',
  styleUrl: './car-card.scss',
})
export class CarCard {
    car = input.required<Car>();
}
