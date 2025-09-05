
import styles from "./LoadingSpinner.module.css"

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
        <div className={styles.dot3}></div>
      </div>
      <p className={styles.text}>Loading amazing content...</p>
    </div>
  )
}

export default LoadingSpinner
