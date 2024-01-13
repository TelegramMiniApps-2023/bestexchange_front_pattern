import { City } from ".";
export type Name = {
  ru: string,
  en: string,
}
export type Country = {
  id: number;
  name: Name;
  icon_url: string;
  cities: City[];
};
