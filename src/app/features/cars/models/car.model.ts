export interface Car {
  _id: string;
  make: string;
  model: string;
  year?: number;
}

export interface CreateCarDto {
  make: string;
  model: string;
  year?: number;
}

export interface UpdateCarDto {
  make: string;
  model: string;
  year?: number;
}
