import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCarDto } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {

  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  saving = signal(false);
  saveError = signal<string | null>(null);


   carForm = this.formBuilder.nonNullable.group({
     make: ['', Validators.required],
     model: ['', Validators.required],
     year: this.formBuilder.control<number|null> (null)
   });


onSubmit(): void {


    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    this.saving.set(true);
    this.saveError.set(null);

    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
    error: (err: Error) => {
      this.saveError.set(err.message);
      this.saving.set(false);
    },
    });
  }

  }




