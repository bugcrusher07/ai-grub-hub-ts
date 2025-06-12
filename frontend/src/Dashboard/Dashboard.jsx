"use client"

import Sidebar from "./Sidebar/Sidebar"
import AccountInfo from "./AccountInfo/AccountInfo"
import Subscription from "./Subscription/Subscription"
import RecentActivity from "./RecentActivity/RecentActivity"
import UsageAnalytics from "./UsageAnalytics/UsageAnalytics"
import AITrends from "./AITrends/AITrends"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <AccountInfo />
          <Subscription />
          <RecentActivity />
        </div>
        <div className={styles.bottomRow}>
          <UsageAnalytics />
          <AITrends />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
