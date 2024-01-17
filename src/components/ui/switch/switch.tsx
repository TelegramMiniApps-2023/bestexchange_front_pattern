// Switch.tsx

import React, { forwardRef, useState } from "react";
import styles from "./switch.module.scss";

export type SwitchChangeEventHandler = (
  checked: boolean,
  event:
    | React.MouseEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>
) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange" | "onClick"> {
  className?: string;
  prefixCls?: string;
  disabled?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: SwitchChangeEventHandler;
  onClick?: SwitchClickEventHandler;
  tabIndex?: number;
  checked?: boolean;
  defaultChecked?: boolean;
  loadingIcon?: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { checked, defaultChecked, disabled, onClick, onChange, ...restProps },
    ref
  ) => {
    const [innerChecked, setInnerChecked] = useState<boolean>(
      checked !== undefined ? checked : defaultChecked || false
    );

    function triggerChange(
      newChecked: boolean,
      event:
        | React.MouseEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) {
      const mergedChecked = newChecked;

      if (!disabled) {
        setInnerChecked(mergedChecked);
        onChange?.(mergedChecked, event);
      }

      return mergedChecked;
    }

    function onInternalClick(e: React.MouseEvent<HTMLInputElement>) {
      const ret = triggerChange(!innerChecked, e);
      onClick?.(ret, e);
      console.log(innerChecked);
    }

    return (
      <label className={styles.switch}>
        <input
          {...restProps}
          type="checkbox"
          className={styles.switchInput}
          defaultChecked={innerChecked}
          onClick={onInternalClick}
          ref={ref}
        />
        <span className={styles.switchSpan} />
      </label>
    );
  }
);
