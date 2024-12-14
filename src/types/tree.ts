export interface Tree {
  id: string;
  number: number;  // Added number field
  name: string;
  latinName: string;
  lat: number;
  lng: number;
  address: string;
  schwebebahnStop: string;
  family?: string;
  nativeCountry?: string;
  yearPlanted?: number;
  maxHeight?: number;
  maxAge?: number;
  habitat?: string;
  features: string;
  description: string;
  image: string;
  thumbnail: string;
}
