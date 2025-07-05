"use client"

import { Menu, X,User } from "lucide-react"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"
import  { useState, useRef, useEffect } from "react";

const Avatar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.avatarWrapper} ref={popupRef}>
      <img
        src={user?.image || <User size={16}/>}
        alt="U"
        className={styles.avatarImage}
        onClick={togglePopup}
      />

      {open && (
        <div className={styles.popup}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.meta}>
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <ul className={styles.infoList}>
            <li><strong>Tokens:</strong> {user.tokens}</li>
            <li><strong>Subscription:</strong> {user.subscription}</li>
            <li><strong>Analytics:</strong> {user.analytics}</li>
            <li><strong>Usage:</strong> {user.usage}</li>
          </ul>
        </div>
      )}
    </div>
  );
};


const Header = ({user}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
    const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const User= {
  name: "John Doe",
  image: "/john-avatar.jpg",
  createdAt: "2024-02-20T12:34:00Z",
  tokens: 120,
  subscription: "Pro",
  analytics: "Enabled",
  usage: "75%",
};
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
          {!User?
          <button onClick={()=>{navigate("/auth")}} className={styles.loginBtn}>Login</button>: <Avatar user={User}/>}
          <button onClick={scrollToPricing} className={styles.ctaBtn}>Get Started</button>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
