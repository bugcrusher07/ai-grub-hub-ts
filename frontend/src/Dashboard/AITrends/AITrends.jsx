import { TrendingUp } from "lucide-react"
import styles from "./AITrends.module.css"

const AITrends = () => {
  const trends = {
    dailyUsage: {
      value: "+12%",
      progress: 75,
    },
    weeklyGrowth: {
      value: "+25%",
      progress: 60,
    },
    efficiencyScore: {
      value: "92/100",
      progress: 92,
    },
    quickStats: {
      tasksToday: 127,
      successRate: "89%",
    },
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <TrendingUp size={16} className={styles.titleIcon} />
          <h2>AI Trends</h2>
        </div>
        <p className={styles.subtitle}>Your usage patterns</p>
      </div>

      <div className={styles.trendsContainer}>
        <div className={styles.trendItem}>
          <div className={styles.trendHeader}>
            <span className={styles.trendLabel}>Daily Usage</span>
            <span className={styles.trendValue}>{trends.dailyUsage.value}</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${trends.dailyUsage.progress}%` }}></div>
          </div>
        </div>

        <div className={styles.trendItem}>
          <div className={styles.trendHeader}>
            <span className={styles.trendLabel}>Weekly Growth</span>
            <span className={styles.trendValue}>{trends.weeklyGrowth.value}</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${trends.weeklyGrowth.progress}%` }}></div>
          </div>
        </div>

        <div className={styles.trendItem}>
          <div className={styles.trendHeader}>
            <span className={styles.trendLabel}>Efficiency Score</span>
            <span className={styles.trendValue}>{trends.efficiencyScore.value}</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${trends.efficiencyScore.progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className={styles.statsSection}>
        <h3 className={styles.statsTitle}>Quick Stats</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>⭐</span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{trends.quickStats.tasksToday}</span>
              <span className={styles.statLabel}>Tasks Today</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>📈</span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{trends.quickStats.successRate}</span>
              <span className={styles.statLabel}>Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITrends
