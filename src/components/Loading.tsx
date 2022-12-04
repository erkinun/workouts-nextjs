import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img src="/images/loader.gif" alt="Loading..." />
    </div>
  );
}
