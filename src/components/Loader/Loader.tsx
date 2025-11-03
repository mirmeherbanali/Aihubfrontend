import styles from "../ui/style/Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderOverlay} role="status" aria-label="Loading...">
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
