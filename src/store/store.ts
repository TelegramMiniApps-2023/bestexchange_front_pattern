import { create } from "zustand";
import { Options } from "../model/Options";
import { devtools } from "zustand/middleware";

interface SelectsState {
  giveSelect: Options | null;
  getSelect: Options | null;
  setGiveSelect: (option: Options | null) => void;
  setGetSelect: (option: Options | null) => void;
  switchOptions: () => Promise<void>;
}

export const useSelectsStore = create<SelectsState>()(
  devtools(
    (set) => ({
      giveSelect: null,
      getSelect: null,
      setGiveSelect: (option) => set({ giveSelect: option }),
      setGetSelect: (option) => set({ getSelect: option }),
      switchOptions: async () => {
        set((state) => {
          const get = state.giveSelect;
          return { giveSelect: state.getSelect, getSelect: get };
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
