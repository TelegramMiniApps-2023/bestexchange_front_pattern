import { create } from "zustand";
import { Options } from "../model/Options";
import { devtools } from "zustand/middleware";
import { directionTabsValute } from "../assets/consts";

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
type DirectionTabs = {
  typeValute: string;
  setTypeValute: (valute: string) => void;
};

export const useDirectionTabsStore = create<DirectionTabs>()((set) => ({
  typeValute: directionTabsValute[0],
  setTypeValute: (valute) => set({ typeValute: valute }),
}));
