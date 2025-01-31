export interface providerType {
  name: string;
  address?: string;

  coordinates: number[];

  specilization: string[];
  consultation_fee: number;
  insurance: string[];
  rating?: number;
}
