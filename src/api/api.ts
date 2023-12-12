import { $host } from "./base";
import { ICategories } from "../model/ICategories";
import { IExchanger } from "../model/IExchanger";

export const fetchOptions = async () => {
  try {
    const { data } = await $host.get<ICategories>("/api/valute/no_cash");
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

export const fetchAvailable = async (base: string | undefined) => {
  try {
    const { data } = await $host.get<ICategories>(
      `/api/available_directions?base=${base}`
    );
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

export const fetchExchangers = async (
  from: string | undefined,
  to: string | undefined
) => {
  try {
    const { data } = await $host.get<IExchanger[]>(
      `/api/directions?valute_from=${from}&valute_to=${to}`
    );
    return data;
  } catch (error: any) {
    throw error.message;
  }
};
