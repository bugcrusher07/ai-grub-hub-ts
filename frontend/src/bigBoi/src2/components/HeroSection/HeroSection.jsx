import { ArrowRight, Sparkles } from "lucide-react"
import styles from "./HeroSection.module.css"

const HeroSection = () => {
  function scrollToTools(){
   document.getElementById("tools")?.scrollIntoView({behavior:"smooth"})
  }
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>8 Powerful AI Tools</span>
          </div>

          <h1 className={styles.title}>
            Transform Your Workflow with
            <span className={styles.gradient}> AI-Powered Tools</span>
          </h1>

          <p className={styles.subtitle}>
            Boost your productivity with our comprehensive suite of AI tools. From fitness planning to code debugging,
            we've got everything you need to work smarter, not harder.
          </p>

          <div className={styles.actions}>
            <button onClick={scrollToTools} className={styles.primaryBtn}>
              Start Free Trial
              <ArrowRight size={20} />
            </button>
            <button onClick={scrollToTools} className={styles.secondaryBtn}>Watch Demo</button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Active Users</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>8</span>
              <span className={styles.statLabel}>AI Tools</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>99.9%</span>
              <span className={styles.statLabel}>Uptime</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.floatingCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.aiAnimation}>
                <div className={styles.pulse}></div>
                <span>AI Processing...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
