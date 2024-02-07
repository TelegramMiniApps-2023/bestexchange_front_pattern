import { useQuery } from "react-query";
import {
  availableKey,
  citiesKey,
  countriesKey,
  directionCashKey,
  exchangersKey,
} from "../assets/consts";
import { City, Country, DirectionCash } from "../model";
import { Categories } from "../model/Categories";
import { Exchanger } from "../model/Exchanger";
import { $host } from "./base";
import { AxiosError } from "axios";

//безналичные

type ReqFetchAvailableDto = {
  base: string | undefined;
  city?: string;
};
export type ResFetchAvailable = {
  ru: Categories;
  en: Categories
}
// todo добавить что бы не было много запрос в случае ошибки 

//запрос на получение доступных направлений
export const useFetchAvailable = ({ base = "all", city }: ReqFetchAvailableDto) => {

  const apiUrl = city
    ? `/api/available_valutes?city=${city}&base=${base}`
    : `/api/available_valutes?base=${base}`;
  const fetchAvailable = async () =>
    (await $host.get<ResFetchAvailable>(apiUrl))
      .data;

  const queryResult = useQuery<ResFetchAvailable,AxiosError>({
    queryKey: [availableKey, base, city],
    queryFn: fetchAvailable,
    enabled: true,
    cacheTime: Infinity,
    retry: false,
    // onError:  (err:AxiosError) => {
    //   console.log('Something went wrong ' , err.response?.status)
    // }
  });
  return queryResult;
};
// todo 
//тип для получения обменников на основе выбранных валют
type ReqFetchExchangersDto = {
  from: string | undefined;
  to: string | undefined;
  city?: string | undefined;
};
//todo отмена запроса если fetchAvailable провалился
//запрос на получение обменников на основе выбранных валют
export const useFetchExchangers = ({ from, to, city }: ReqFetchExchangersDto) => {

  const apiUrl = city
    ? `api/directions?city=${city}&valute_from=${from}&valute_to=${to}`
    : `api/directions?valute_from=${from}&valute_to=${to}`;
  const fetchExchangers = async () => (
    await $host.get<DirectionCash[]>(
      apiUrl
    )
  ).data;
  const queryResult = useQuery<DirectionCash[],AxiosError | null>({
    queryKey: [exchangersKey, city],
    queryFn: fetchExchangers,
    cacheTime: Infinity,
    enabled: false,
    retry: false,
    // onError:  (err:AxiosError) => {
    //   console.log('Something went wrong ' , err.response?.status)
    // }
  });
  return queryResult;
};

//наличные

//запрос на получение стран
export const useFetchCashCountries = () => {
  const fetchExchangers = async () =>
    (await $host.get<Country[]>(`/api/cash/countries`)).data;
  const queryResult = useQuery({
    queryKey: [countriesKey],
    queryFn: fetchExchangers,
    staleTime: 60 * 1000 * 5,
    enabled: true,
  });
  return queryResult;
};
