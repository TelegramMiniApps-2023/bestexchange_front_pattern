import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Options } from "../model/Options";
import { City, Country } from "../model";

interface SelectsState {
  giveSelect: Options | null;
  getSelect: Options | null;
  setGiveSelect: (option: Options | null) => void;
  setGetSelect: (option: Options | null) => Promise<void>;
  switchOptions: () => Promise<void>;
}

export const useSelectsStore = create<SelectsState>()(
  devtools(
    (set) => ({
      giveSelect: null,
      getSelect: null,
      setGiveSelect: (option) => set({ giveSelect: option }),
      setGetSelect: async (option) => set({ getSelect: option }),
      switchOptions: async () => {
        set((state) => {
          return {
            giveSelect: state.getSelect,
            getSelect: state.giveSelect,
          };
        });
      },
    }),
    { name: "selectsStore" }
  )
);

interface FiltersState {
  filter: string | null;
  search: string;
  setFilter: (category: string | null) => void;
  setSearch: (value: string) => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  filter: null,
  search: "",
  setFilter: (category) => set({ filter: category }),
  setSearch: (value) => set({ search: value }),
}));

//Store for DirectionTabs component, switch cash/noCash
type valute = "cash" | "noCash";
type DirectionTabs = {
  typeValute: valute | string;
  setTypeValute: (valute: valute | string) => void;
};

export const useDirectionTabsStore = create<DirectionTabs>()((set) => ({
  typeValute: "noCash",
  setTypeValute: (valute) => set({ typeValute: valute }),
}));

//Store for cash direction
type Location = {
  location: {
    country: Country;
    city: City;
  };
};

interface CashState {
  location: Location | null;
  setLocation: (location: Location | null) => void;
}

export const useCashStore = create<CashState>()((set) => ({
  location: null,
  setLocation: (location) => set({ location: location }),
}));
