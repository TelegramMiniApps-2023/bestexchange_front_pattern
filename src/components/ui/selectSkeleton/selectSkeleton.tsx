import styles from "./selectSkeleton.module.scss";

export const SelectSkeleton = () => {
  return (
    <section className={styles.select}>
      <section>
        <header className={styles.pulse__container}>
          <figure className={styles.pulse__element}></figure>
          <h3 className={styles.pulse__element}></h3>
        </header>
      </section>
    </section>
  );
};
