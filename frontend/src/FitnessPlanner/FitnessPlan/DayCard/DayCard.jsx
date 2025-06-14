"use client"

import { Clock, Target, CheckCircle, Play } from "lucide-react"
import styles from "./DayCard.module.css"

const DayCard = ({ day, isCompleted, onComplete }) => {
  return (
    <div className={`${styles.card} ${isCompleted ? styles.completed : ""}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.dayBadge}>Day {day.day}</div>
          <div>
            <h2 className={styles.title}>{day.title}</h2>
            <p className={styles.subtitle}>{day.exercises.length} exercises • Estimated 30-45 min</p>
          </div>
        </div>

        {!isCompleted && (
          <button className={styles.startButton} onClick={onComplete}>
            <Play size={16} />
            Start Workout
          </button>
        )}

        {isCompleted && (
          <div className={styles.completedBadge}>
            <CheckCircle size={20} />
            Completed!
          </div>
        )}
      </div>

      <div className={styles.exercisesList}>
        {day.exercises.map((exercise, index) => (
          <div key={index} className={styles.exerciseCard}>
            <div className={styles.exerciseNumber}>{index + 1}</div>
            <div className={styles.exerciseContent}>
              <h3 className={styles.exerciseName}>{exercise.name}</h3>
              <div className={styles.exerciseDetails}>
                <div className={styles.detail}>
                  <Target size={14} />
                  <span>{exercise.sets} sets</span>
                </div>
                <div className={styles.detail}>
                  <span>•</span>
                  <span>{exercise.reps} reps</span>
                </div>
                {exercise.rest !== "-" && (
                  <div className={styles.detail}>
                    <Clock size={14} />
                    <span>{exercise.rest} rest</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.tips}>
          <h4>💡 Pro Tips</h4>
          <ul>
            <li>Warm up for 5-10 minutes before starting</li>
            <li>Focus on proper form over speed</li>
            <li>Stay hydrated throughout your workout</li>
            <li>Cool down and stretch after completing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DayCard
