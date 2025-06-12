import styles from "./Subscription.module.css"

const Subscription = () => {
  const subscription = {
    plan: "Pro Plan",
    price: "$29/month",
    renewal: "June 15, 2024",
    tokens: {
      used: 750,
      total: 1000,
      resetDays: 22,
    },
  }

  const tokenPercentage = (subscription.tokens.used / subscription.tokens.total) * 100

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>Subscription</h2>
          <p className={styles.subtitle}>Your current plan and usage</p>
        </div>
        <span className={styles.statusBadge}>Active</span>
      </div>

      <div className={styles.planInfo}>
        <div className={styles.planDetails}>
          <h3>{subscription.plan}</h3>
          <p className={styles.price}>{subscription.price}</p>
        </div>
        <div className={styles.renewalInfo}>
          <span className={styles.renewalLabel}>Renewal</span>
          <span className={styles.renewalDate}>{subscription.renewal}</span>
        </div>
      </div>

      <div className={styles.tokensSection}>
        <div className={styles.tokensHeader}>
          <span className={styles.tokensLabel}>AI Tokens</span>
          <span className={styles.tokensCount}>
            {subscription.tokens.used} / {subscription.tokens.total}
          </span>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${tokenPercentage}%` }}></div>
        </div>
        <p className={styles.resetInfo}>Tokens reset in {subscription.tokens.resetDays} days</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.upgradeButton}>Upgrade Plan</button>
        <button className={styles.billingButton}>Billing</button>
      </div>
    </div>
  )
}

export default Subscription
