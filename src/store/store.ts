import { makeAutoObservable } from "mobx";
import { ICategories } from "../model/ICategories";
import { IExchanger } from "../model/IExchanger";
import { IOption } from "../model/IOption";
import { fetchAvailable, fetchExchangers, fetchOptions } from "../api/api";

export default class OptionStore {
  _options: {
    data: ICategories;
    error: string;
    isLoading: boolean;
  } | null;
  _filteredOptions: ICategories | null;
  _filteredAvailables: ICategories | null;
  _available: {
    data: ICategories;
    error: string;
    isLoading: boolean;
  } | null;
  _get: IOption | null;
  _give: IOption | null;
  _exchangers: {
    data: IExchanger[];
    error: string;
    isLoading: boolean;
  } | null;
  constructor() {
    this._options = null;
    this._filteredOptions = null;
    this._available = null;
    this._filteredAvailables = null;
    this._get = null;
    this._give = null;
    this._exchangers = null;
    makeAutoObservable(this);
  }

  setGive = (option: IOption | null) => {
    this._give = option;
  };
  setGet = (option: IOption | null) => {
    this._get = option;
  };
  clearExchangers = () => {
    this._exchangers = null;
  };
  switchOptions = () => {
    const get = this._give;
    this._give = this._get;
    this._get = get;
  };

  // async
  setOptions = async () => {
    try {
      this._options = {
        data: {},
        error: "",
        isLoading: true,
      };
      const data = await fetchOptions();
      this._options = {
        data: data,
        error: "",
        isLoading: false,
      };
      this._filteredOptions = data;
    } catch (error) {
      this._options = {
        data: {},
        error: "Что-то пошло не так...",
        isLoading: false,
      };
    }
  };
  setAvailable = async () => {
    try {
      this._available = {
        data: {},
        error: "",
        isLoading: true,
      };
      const data = await fetchAvailable(this._give?.code_name);
      this._available = {
        data: data,
        error: "",
        isLoading: false,
      };
      this._filteredAvailables = data;
    } catch (error) {
      this._available = {
        data: {},
        error: "Что-то пошло не так...",
        isLoading: false,
      };
    }
  };
  setExchangers = async () => {
    try {
      this._exchangers = {
        data: [],
        error: "",
        isLoading: true,
      };
      const data = await fetchExchangers(
        this._give?.code_name,
        this._get?.code_name
      );
      this._exchangers = {
        data: data,
        error: "",
        isLoading: false,
      };
    } catch (error) {
      this._exchangers = {
        data: [],
        error: "Что-то пошло не так...",
        isLoading: false,
      };
    }
  };

  get options() {
    return this._options;
  }
  get available() {
    return this._available;
  }
  get exchangers() {
    return this._exchangers;
  }
  get give() {
    return this._give;
  }
  get get() {
    return this._get;
  }
}
