"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import styles from "./Header.module.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>AI Tools Hub</h2>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <a href="#tools">Tools</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#demo">Demo</a>
          <a href="#about">About</a>
        </nav>

        <div className={styles.headerActions}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.ctaBtn}>Get Started</button>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
