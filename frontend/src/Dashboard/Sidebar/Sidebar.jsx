import { Home, BarChart, MessageSquare, Clock, Bookmark, CreditCard, Settings, User, HelpCircle } from "lucide-react"
import styles from "./Sidebar.module.css"

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={18} />, label: "Home" },
    { icon: <BarChart size={18} />, label: "Analytics" },
    { icon: <MessageSquare size={18} />, label: "AI Chatbot" },
    { icon: <Clock size={18} />, label: "Recently Used Tools" },
    { icon: <Bookmark size={18} />, label: "Bookmarked Outputs" },
    { icon: <CreditCard size={18} />, label: "Subscriptions & Billing" },
    { icon: <Settings size={18} />, label: "Profile & Settings" },
    { icon: <User size={18} />, label: "Account" },
  ]

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>Dashboard</div>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.support}>
        <a href="#" className={styles.supportLink}>
          <span className={styles.icon}>
            <HelpCircle size={18} />
          </span>
          <span className={styles.label}>Support</span>
        </a>
      </div>
    </div>
  )
}

export default Sidebar
