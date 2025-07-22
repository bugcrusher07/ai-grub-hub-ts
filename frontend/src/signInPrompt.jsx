import { useState, useEffect } from "react"
import { X, Sparkles, Zap, Star, ArrowRight, Mail, Github, Chrome } from "lucide-react"
import styles from './signInPrompt.module.css';

export const SignInPrompt = ({ isOpen, onClose, onSignIn }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: "🚀", text: "Unlock AI-powered tools" },
    { icon: "⚡", text: "Lightning-fast performance" },
    { icon: "🎯", text: "Personalized experience" },
    { icon: "🔥", text: "Exclusive premium features" },
  ]

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      const interval = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length)
      }, 2000)
      return () => clearInterval(interval)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSocialSignIn = (provider) => {

    // onSignIn?.(provider)
    if ( provider =="email"){
      window.location.href("/auth");
    }else if (provider = "google"){
      widnow.alert("This function isn't implemented at this time, please use email");
    }else{
      widnow.alert("This function isn't implemented at this time, please use email");
    }
  }

  if (!isOpen) return null

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ""}`} onClick={handleBackdropClick}>
      <div className={`${styles.popup} ${isVisible ? styles.popupVisible : ""}`}>
        <div className={styles.background}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <div className={styles.mainIcon}>
                <Sparkles className={styles.sparkleIcon} />
              </div>
              <div className={styles.floatingIcons}>
                <Star className={styles.floatingIcon} style={{ "--delay": "0s" }} />
                <Zap className={styles.floatingIcon} style={{ "--delay": "0.5s" }} />
                <Star className={styles.floatingIcon} style={{ "--delay": "1s" }} />
              </div>
            </div>

            <h2 className={styles.title}>
              <span className={styles.titleGradient}>Join the Revolution!</span>
            </h2>
            <p className={styles.subtitle}>Sign in to unlock amazing AI-powered features and join thousands of users</p>
          </div>

          <div className={styles.featuresContainer}>
            <div className={styles.featureDisplay}>
              <span className={styles.featureIcon}>{features[currentFeature].icon}</span>
              <span className={styles.featureText}>{features[currentFeature].text}</span>
            </div>
            <div className={styles.featureDots}>
              {features.map((_, index) => (
                <div key={index} className={`${styles.dot} ${index === currentFeature ? styles.dotActive : ""}`}></div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={() => handleSocialSignIn("email")}>
              <Mail size={18} />
              <span>Continue with Email</span>
              <ArrowRight size={16} className={styles.arrowIcon} />
            </button>

            <div className={styles.socialButtons}>
              <button className={styles.socialButton} onClick={() => handleSocialSignIn("google")}>
                <Chrome size={18} />
                <span>Google</span>
              </button>
              <button className={styles.socialButton} onClick={() => handleSocialSignIn("github")}>
                <Github size={18} />
                <span>GitHub</span>
              </button>
            </div>

            <p className={styles.disclaimer}>
              By signing in, you agree to our{" "}<br />
              <div>
                <a href="#" className={styles.link}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>
              </div>
            </p>
          </div>
        </div>

        <div className={styles.decorativeElements}>
          <div className={styles.particle} style={{ "--x": "10%", "--y": "20%", "--delay": "0s" }}></div>
          <div className={styles.particle} style={{ "--x": "80%", "--y": "30%", "--delay": "1s" }}></div>
          <div className={styles.particle} style={{ "--x": "20%", "--y": "70%", "--delay": "2s" }}></div>
          <div className={styles.particle} style={{ "--x": "90%", "--y": "80%", "--delay": "1.5s" }}></div>
        </div>
      </div>
    </div>
  )
}

