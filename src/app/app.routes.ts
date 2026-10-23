import { Routes } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';
import { CarDetails } from './features/cars/pages/car-details/car-details';

export const routes: Routes = [
     {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full'
  },
  {
    path: 'cars',
    component: CarList
  },
    {
    path: 'cars/:id',
    component: CarDetails
  },
  

];
