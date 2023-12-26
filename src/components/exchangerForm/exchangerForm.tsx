import { memo } from "react";
import { Options } from "../../model/Options";
import { Select } from "../select/select";
import { Switcher } from "../switcher/switcher";
import styles from "./exchangerForm.module.scss";
type ExchangerFormProps = {
  give: Options | null;
  get: Options | null;
  refetch: () => void;
};
export const ExchangerForm = memo((props: ExchangerFormProps) => {
  const { get, give, refetch } = props;
  return (
    <div className={styles.selects}>
      <Select type="give" />
      <Switcher give={give} get={get} refetch={refetch} />
      <Select type="get" />
    </div>
  );
});
