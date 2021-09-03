export interface Student {
  id?: string;
  name: number;
  age: string;
  mark: string;
  gender: 'male' | 'female';
  city: string;

  createdAt?: number;
  updatedAt?: number;
}
