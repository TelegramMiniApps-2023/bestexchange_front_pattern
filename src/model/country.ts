import { City } from ".";

export type Country = {
  id: number;
  name: string;
  icon_url: string;
  cities: City[];
};
