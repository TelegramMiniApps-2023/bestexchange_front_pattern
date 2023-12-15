import { create } from "zustand";
import { Options } from "../model/Options";
import { devtools, persist } from "zustand/middleware";

interface SelectsState {
  giveSelect: Options | null;
  getSelect: Options | null;
  setGiveSelect: (option: Options | null) => void;
  setGetSelect: (option: Options | null) => void;
}

export const useSelectsStore = create<SelectsState>()(
  devtools(

    (set) => ({
      giveSelect: null,
      getSelect: null,
      setGiveSelect: (option) => set({ giveSelect: option }),
      setGetSelect: (option) => set({ getSelect: option }),
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
