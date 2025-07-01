"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"
import styles from "./DemoSection.module.css"

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="demo" className={styles.demo}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              See Our <span className={styles.gradient}>AI Tools</span> in Action
            </h2>
            <p className={styles.description}>
              Watch how our AI tools can transform your workflow and boost your productivity. From fitness planning to
              code debugging, see the magic happen in real-time.
            </p>

            <div className={styles.demoStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2.5x</span>
                <span className={styles.statLabel}>Faster Results</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>Accuracy Rate</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Happy Users</span>
              </div>
            </div>

            <button className={styles.ctaButton}>Try It Free Now</button>
          </div>

          <div className={styles.demoVideo}>
            <div className={styles.videoContainer}>
              <div className={styles.videoPlaceholder}>
                <button className={styles.playButton} onClick={handlePlayDemo}>
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>
                <div className={styles.videoOverlay}>
                  <span>Watch Demo</span>
                </div>
              </div>

              <div className={styles.videoFeatures}>
                <div className={styles.feature}>
                  <div className={styles.featureDot}></div>
                  <span>Real-time AI Processing</span>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureDot}></div>
                  <span>Intuitive User Interface</span>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureDot}></div>
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
