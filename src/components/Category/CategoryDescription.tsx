import styles from "../ui/style/CategoryDescription.module.scss";

// You can make this component reusable by accepting props
const CategoryDescription = ({ title = "Category Name" }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non
        tortor sodales, tempor orci et, facilisis odio. Suspendisse varius, nibh
        finibus tincidunt lobortis, sapien nunc maximus eros, vulputate tempor
        lectus elit sed elit. Etiam lobortis mi in urna efficitur, vel interdum
        est finibus. Nullam ullamcorper mollis ipsum, sit amet accumsan elit
        tempus eget. Curabitur pellentesque sed urna vitae cursus. Donec
        molestie orci molestie massa condimentum, non interdum lacus elementum.
        Cras dolor turpis, laoreet vel sapien vitae, consectetur pretium tortor.
      </p>

      <p className={styles.description}>
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc
        commodo pretium libero. Curabitur dignissim mauris tellus, vitae blandit
        erat dignissim ac. Integer et commodo risus, bibendum eleifend justo.
        Vestibulum laoreet lacus ac leo luctus venenatis. Curabitur volutpat
        blandit scelerisque. Nam faucibus libero ut dolor tristique cursus.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos.
      </p>
    </section>
  );
};

export default CategoryDescription;
