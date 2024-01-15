import styles from "./loader.module.scss";

export const Loader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
