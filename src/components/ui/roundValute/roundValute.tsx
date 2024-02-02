import { FC } from "react";

interface RoundValuteProps {
  value: number | string;
}

export const RoundValute: FC<RoundValuteProps> = ({ value }) => {
  const roundValue = (value: number | string) => {
    const numStr = typeof value === "number" ? value.toString() : value;

    const parts = numStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const formattedNumber = parts.join(".");
    return formattedNumber;
  };

  const formattedValute = roundValue(value);

  return <span>{formattedValute}</span>;
};
