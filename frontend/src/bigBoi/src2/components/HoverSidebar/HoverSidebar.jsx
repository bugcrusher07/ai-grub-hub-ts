"use client"

import { useState, useEffect } from "react"
import { Home, Settings, User, HelpCircle, Mail, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./HoverSidebar.module.css"

const HoverSidebar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const threshold = 50
      const windowWidth = window.innerWidth

      if (windowWidth - e.clientX < threshold) {
        setIsVisible(true)
      } else if (e.clientX < windowWidth - 300) {
        setIsVisible(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", href: "#dashboard" },
    { icon: <User size={20} />, label: "Profile", href: "#profile" },
    { icon: <Settings size={20} />, label: "Settings", href: "#settings" },
    { icon: <Bell size={20} />, label: "Notifications", href: "#notifications" },
    { icon: <Mail size={20} />, label: "Messages", href: "#messages" },
    { icon: <HelpCircle size={20} />, label: "Help & Support", href: "#help" },
  ]

  return (
    <>
      <div className={styles.triggerArea}></div>

      <div className={`${styles.sidebar} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.indicator}>{isVisible ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}</div>
          <h3>Quick Access</h3>
        </div>

        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item, index) => (
            <a key={index} href={item.href} className={styles.sidebarItem}>
              <span className={styles.sidebarIcon}>{item.icon}</span>
              <span className={styles.sidebarLabel}>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <User size={16} />
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>John Doe</span>
              <span className={styles.userEmail}>john@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HoverSidebar
