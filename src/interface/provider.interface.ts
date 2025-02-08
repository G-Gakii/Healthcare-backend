export interface providerType {
  name: string;
  address?: string;

  coordinates: number[];

  specialization: string[];
  consultation_fee: number;
  insurance: string[];
  rating?: number;
}
