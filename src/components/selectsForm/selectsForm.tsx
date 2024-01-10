import { memo } from "react";
import { Options } from "../../model/Options";
import { Select } from "../select/select";
import { Switcher } from "../switcher/switcher";
import styles from "./selectsForm.module.scss";
type SelectsFormProps = {
  give: Options | null;
  get: Options | null;
  refetch: () => void;
};
export const SelectsForm = memo((props: SelectsFormProps) => {
  const { get, give, refetch } = props;
  return (
    <section className={styles.selects}>
      <Select type="give" />
      <Switcher give={give} get={get} refetch={refetch} />
      <Select type="get" />
    </section>
  );
});
