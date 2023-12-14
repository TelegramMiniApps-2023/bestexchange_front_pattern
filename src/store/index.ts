import { create } from "zustand";
import { IOption } from "../model/IOption";
import { devtools, persist } from "zustand/middleware";

interface SelectsState {
  giveSelect: IOption | null;
  getSelect: IOption | null;
  setGiveSelect: (option: IOption | null) => void;
  setGetSelect: (option: IOption | null) => void;
}

export const useSelectsStore = create<SelectsState>()(
  devtools(
    persist(
      (set) => ({
        giveSelect: null,
        getSelect: null,
        setGiveSelect: (option) => set({ giveSelect: option }),
        setGetSelect: (option) => set({ getSelect: option }),
      }),
      { name: "selectsStore" }
    )
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
