import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {

  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

   carForm = this.formBuilder.group({
     make: ['', Validators.required],
     model: ['', Validators.required],
     year: ['']
   });

onSubmit(): void {
      const carData: Car = this.carForm.value as Car;
      console.log('Submitted Car:', carData);
      
      this.carService.addCar(carData).subscribe({
        next: (response) => {
          console.log('Car added successfully:', response);
          this.router.navigate(['/cars']); 
        },
        error: (error) => {
          console.error('Error adding car:', error);
        }
      });
    }
  }



