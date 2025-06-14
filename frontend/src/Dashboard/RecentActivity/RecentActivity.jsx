import { Clock } from "lucide-react"
import styles from "./RecentActivity.module.css"

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "AI Chatbot",
      time: "2 minutes ago",
      status: "Active",
    },
    {
      id: 2,
      type: "Image Generator",
      time: "15 minutes ago",
      status: "Completed",
    },
    {
      id: 3,
      type: "Text Generator",
      time: "1 hour ago",
      status: "Completed",
    },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Clock size={16} className={styles.titleIcon} />
          <h2>Recent Activity</h2>
        </div>
        <p className={styles.subtitle}>Your latest AI tool usage</p>
      </div>

      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              {activity.type === "AI Chatbot" && <div className={styles.chatbotIcon}>💬</div>}
              {activity.type === "Image Generator" && <div className={styles.imageGenIcon}>🖼️</div>}
              {activity.type === "Text Generator" && <div className={styles.textGenIcon}>📝</div>}
            </div>
            <div className={styles.activityDetails}>
              <h3>{activity.type}</h3>
              <p className={styles.activityTime}>{activity.time}</p>
            </div>
            <div className={styles.activityStatus}>
              <span
                className={`${styles.statusBadge} ${activity.status === "Active" ? styles.active : styles.completed}`}
              >
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
