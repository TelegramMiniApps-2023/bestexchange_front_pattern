import { Exchanger } from "./Exchanger";

export type DirectionCash = Exchanger & {
    params: string,
    fromfee: string,
}

