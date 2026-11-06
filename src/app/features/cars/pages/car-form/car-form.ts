import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCarDto } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {

  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);


  readonly currentYear = new Date().getFullYear();

  carForm = this.formBuilder.nonNullable.group({
    make: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    model: ['', [Validators.required, Validators.maxLength(30)]],
    year: this.formBuilder.control<number | null>(null, [Validators.min(1950), Validators.max(this.currentYear + 1),]),
  });



  onSubmit(): void {

    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    this.saving.set(true);
    this.saveError.set(null);

    this.carForm.disable();

    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        this.snackBar.open(`${newCar.make} ${newCar.model} saved`, 'Close', { duration: 10000 });
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.carForm.enable();
        this.saveError.set(err.message);
        this.saving.set(false);
      },
    });
  }
}




