import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};
export const Button = (props: ButtonProps) => {
  const { className, disabled, children, ...otherProps } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(className)}
      {...otherProps}
    >
      {children}
    </button>
  );
};
