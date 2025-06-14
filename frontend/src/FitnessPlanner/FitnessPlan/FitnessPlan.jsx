"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Trophy, Zap, Target, CheckCircle } from "lucide-react"
import DayCard from "./DayCard/DayCard"
import styles from "./FitnessPlan.module.css"

const FitnessPlan = ({ plan, onBack }) => {
  const [selectedDay, setSelectedDay] = useState(1)
  const [completedDays, setCompletedDays] = useState(new Set())

  const markDayComplete = (day) => {
    setCompletedDays((prev) => new Set([...prev, day]))
  }

  const currentDay = plan.days.find((d) => d.day === selectedDay)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Form
        </button>

        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Trophy className={styles.trophyIcon} />
          </div>
          <h1 className={styles.title}>{plan.title}</h1>
          <p className={styles.subtitle}>{plan.subtitle}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <Calendar className={styles.statIcon} />
              <span>7 Days</span>
            </div>
            <div className={styles.stat}>
              <Target className={styles.statIcon} />
              <span>Personalized</span>
            </div>
            <div className={styles.stat}>
              <Zap className={styles.statIcon} />
              <span>AI Generated</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>
            <Calendar size={20} />
            Weekly Overview
          </h3>

          <div className={styles.daysList}>
            {plan.days.map((day) => (
              <button
                key={day.day}
                className={`${styles.dayButton} ${selectedDay === day.day ? styles.active : ""} ${completedDays.has(day.day) ? styles.completed : ""}`}
                onClick={() => setSelectedDay(day.day)}
              >
                <div className={styles.dayNumber}>
                  {completedDays.has(day.day) ? <CheckCircle size={20} className={styles.checkIcon} /> : day.day}
                </div>
                <div className={styles.dayInfo}>
                  <div className={styles.dayTitle}>Day {day.day}</div>
                  <div className={styles.daySubtitle}>{day.title}</div>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.progress}>
            <div className={styles.progressHeader}>
              <span>Progress</span>
              <span>{completedDays.size}/7</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(completedDays.size / 7) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className={styles.main}>
          {currentDay && (
            <DayCard
              day={currentDay}
              isCompleted={completedDays.has(currentDay.day)}
              onComplete={() => markDayComplete(currentDay.day)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FitnessPlan
