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

//безналичные

type ReqFetchAvailableDto = {
  base: string | undefined;
  city?: string;
};
// todo добавить что бы не было много запрос в случае ошибки 

//запрос на получение доступных направлений
export const useFetchAvailable = ({ base = "all", city }: ReqFetchAvailableDto) => {

  const apiUrl = city
    ? `/api/available_valutes?city=${city}&base=${base}`
    : `/api/available_valutes?base=${base}`;
  const fetchAvailable = async () =>
    (await $host.get<Categories>(apiUrl))
      .data;

  const queryResult = useQuery({
    queryKey: [availableKey, base, city],
    queryFn: fetchAvailable,
    enabled: true,
    cacheTime: Infinity,
    retry: false,
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

  // if (city) {
  //   return (
  //     await $host.get<DirectionCash[]>(
  //       apiUrl
  //     )
  //   ).data;

  // }
  // return (
  //   await $host.get<Exchanger[]>(
  //     apiUrl
  //   )
  // ).data;



  const queryResult = useQuery({
    queryKey: [exchangersKey, city],
    queryFn: fetchExchangers,
    staleTime: 60 * 1000 * 5,
    enabled: false,
    retry: false
  });
  return queryResult;
};

//наличные

//запрос на получение стран
export const useFetchCashCountries = () => {
  const fetchExchangers = async () =>
    (await $host.get<Country[]>(`/api/cash/countries_multi`)).data;
  const queryResult = useQuery({
    queryKey: [countriesKey],
    queryFn: fetchExchangers,
    staleTime: 60 * 1000 * 5,
    enabled: true,
  });
  return queryResult;
};
//запрос на получение доступных городов на освное выбранной страны
// type ReqFetchAvailableCitiesDto = {
//   country: string;
// };
// export const useFetchCashAvailableCities = ({
//   country,
// }: ReqFetchAvailableCitiesDto) => {
//   const fetchExchangers = async () =>
//     (await $host.get<City[]>(`/api/cash/available_cities?country=${country}`))
//       .data;
//   const queryResult = useQuery({
//     queryKey: [citiesKey, country],
//     queryFn: fetchExchangers,
//     staleTime: 60 * 1000 * 5,
//     enabled: true,
//   });
//   return queryResult;
// };
// запрос на получение доступных валют
type ReqFetchAvailableValutesDto = {
  city: string;
  base: string;
};
export const useFetchCashAvailableValutes = ({
  base,
  city,
}: ReqFetchAvailableValutesDto) => {
  const fetchExchangers = async () =>
    (
      await $host.get<Categories>(
        `/api/cash/available_valutes?city=${city}&base=${base}`
      )
    ).data;
  const queryResult = useQuery({
    queryKey: [citiesKey, countriesKey],
    queryFn: fetchExchangers,
    staleTime: 60 * 1000 * 5,
    enabled: true,
  });
  return queryResult;
};
// запрос на получение направлений обмена на основне: города, валюты и сокращенного названия валюты
type ReqFetchDirectionsDto = {
  city: string;
  valute_from: string;
  valute_to: string;
};
export const useFetchCashDirections = ({
  city,
  valute_from,
  valute_to,
}: ReqFetchDirectionsDto) => {
  const fetchExchangers = async () =>
    (
      await $host.get<DirectionCash[]>(
        `/api/cash/directions?city=${city}&valute_from=${valute_from}&valute_to=${valute_to}`
      )
    ).data;
  const queryResult = useQuery({
    queryKey: [directionCashKey, city, valute_from, valute_to],
    queryFn: fetchExchangers,
    staleTime: 60 * 1000 * 5,
    enabled: true,
  });
  return queryResult;
};
