import { useQuery } from "react-query";
import { availableKey, exchangersKey } from "../assets/consts";
import { Categories } from "../model/Categories";
import { Exchanger } from "../model/Exchanger";
import { $host } from "./base";

//запрос на получение всех доступных направлений
// export const useFetchOptions = () => {
//   const fetchOptions = async () => (await $host.get<Categories>(`/api/no_cash/directions`)).data
//   const queryResult = useQuery({
//     queryKey: [optionsKey],
//     queryFn: fetchOptions,
//     staleTime: 60 * 1000 * 5,
//     enabled: true

//   })
//   return queryResult
// };

// тип для получение доступных направлений 
type ReqFetchAvailableDto = {
  base: string | undefined
}
//запрос на получение доступных направлений
export const useFetchAvailable = ({ base }: ReqFetchAvailableDto) => {
  const fetchAvailable = async () => (await $host.get<Categories>(`/api/no_cash/available_valutes?base=${base}`)).data

  const queryResult = useQuery({
    queryKey: [availableKey, base],
    queryFn: fetchAvailable,
    staleTime: 60 * 1000 * 5,



  })
  return queryResult
};


//тип для получения обменников на основе выбранных валют
type ReqFetchExchangersDto = {
  from: string | undefined,
  to: string | undefined
}
//запрос на получение обменников на основе выбранных валют
export const useFetchExchangers = ({ from, to }: ReqFetchExchangersDto) => {
  const fetchExchangers = async () => (await $host.get<Exchanger[]>(`/api/no_cash/directions?valute_from=${from}&valute_to=${to}`)).data
  const queryResult = useQuery({
    queryKey: [exchangersKey],
    queryFn: fetchExchangers,
    staleTime: 60 * 1000 * 5,
    enabled: false,
  })
  return queryResult
};
