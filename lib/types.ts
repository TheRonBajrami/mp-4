export type Weather = {
  city: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  desc: string;
  icon?: string;
  humidity: number;
  windKph: number;
};