import styles from "./AccountInfo.module.css"

const AccountInfo = () => {
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "Jan 15, 2023",
    accountType: "Pro",
    lastLogin: "Today, 10:30 AM",
    status: "Active",
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Account Information</h2>
        <p className={styles.subtitle}>Your personal account details</p>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.avatar}></div>
        <div className={styles.userDetails}>
          <h3>{userInfo.name}</h3>
          <p className={styles.email}>{userInfo.email}</p>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Member since</span>
          <span className={styles.infoValue}>{userInfo.memberSince}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Account type</span>
          <span className={styles.infoValue}>{userInfo.accountType}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Last login</span>
          <span className={styles.infoValue}>{userInfo.lastLogin}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Status</span>
          <span className={`${styles.infoValue} ${styles.statusActive}`}>{userInfo.status}</span>
        </div>
      </div>
    </div>
  )
}

export default AccountInfo
