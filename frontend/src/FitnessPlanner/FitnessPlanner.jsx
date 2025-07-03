import { useState } from "react"
import { Zap, Target, Sparkles, ArrowRight, User, Activity, Ruler, Clock } from "lucide-react"
import FitnessPlan from "./FitnessPlan/FitnessPlan"
import styles from "./FitnessPlanner.module.css"
import {ArrowLeft} from "lucide-react";
import {useNavigate} from 'react-router-dom';

const FitnessPlanner = () => {
  const navigate = useNavigate();
  const onBack = ()=>{
    navigate('/');
  }

  const [formData, setFormData] = useState({
    bodyweight: "",
    height: "",
    age: "",
    activityLevel: "",
    trainingStyle: "",
    motivation: "",
    customMessage: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState(null)

  const activityLevels = [
    { value: "beginner", label: "Beginner", desc: "Just starting out" },
    { value: "intermediate", label: "Intermediate", desc: "Some experience" },
    { value: "advanced", label: "Advanced", desc: "Very experienced" },
  ]

  const trainingStyles = [
    { value: "strength", label: "Strength Training", icon: "💪" },
    { value: "cardio", label: "Cardio Focus", icon: "🏃" },
    { value: "flexibility", label: "Flexibility & Yoga", icon: "🧘" },
    { value: "mixed", label: "Mixed Training", icon: "🔥" },
  ]

  const motivations = [
    { value: "weight-loss", label: "Weight Loss", icon: "⚖️" },
    { value: "muscle-gain", label: "Muscle Gain", icon: "💪" },
    { value: "endurance", label: "Build Endurance", icon: "🏃" },
    { value: "general-fitness", label: "General Fitness", icon: "✨" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

const generateFitnessPlan = async () => {
  setIsGenerating(true);

  try {
    const res = await fetch('http://localhost:3000/api/fitness-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('API Response:', data);

    // Set the generated plan data
    setGeneratedPlan(data.content);
    setShowPlan(true);

  } catch (error) {
    console.error('Error generating fitness plan:', error);
    alert('Failed to generate fitness plan. Please try again.');
  } finally {
    setIsGenerating(false);
  }
}
  if (showPlan && generatedPlan) {
    return <FitnessPlan plan={generatedPlan} onBack={() => setShowPlan(false)} />
  }

  return (
    <div className={styles.container}>
       <button className={styles.backButton} onClick={onBack} >
          <ArrowLeft size={20} />
          Home
        </button>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <Zap className={styles.sparkle} />
          </div>
          <h1 className={styles.heroTitle}>
            AI Fitness Planner
            <span className={styles.gradient}>Transform Your Body</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Get a personalized 7-day fitness plan powered by AI. Tell us about yourself and we'll create the perfect
            workout routine just for you.
          </p>
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <Target className={styles.formIcon} />
            <h2>Let's Build Your Perfect Plan</h2>
            <p>Answer a few questions to get started</p>
          </div>

          <div className={styles.formGrid}>
            {/* Basic Info */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <User size={18} />
                Age
              </label>
              <input
                type="number"
                className={styles.input}
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Ruler size={18} />
                Height (cm)
              </label>
              <input
                type="number"
                className={styles.input}
                placeholder="Enter your height"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Activity size={18} />
                Body Weight (kg)
              </label>
              <input
                type="number"
                className={styles.input}
                placeholder="Enter your weight"
                value={formData.bodyweight}
                onChange={(e) => handleInputChange("bodyweight", e.target.value)}
              />
            </div>

            {/* Activity Level */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Clock size={18} />
                Activity Level
              </label>
              <div className={styles.optionGrid}>
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    className={`${styles.optionCard} ${formData.activityLevel === level.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("activityLevel", level.value)}
                  >
                    <div className={styles.optionTitle}>{level.label}</div>
                    <div className={styles.optionDesc}>{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Training Style */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Training Style</label>
              <div className={styles.optionGrid}>
                {trainingStyles.map((style) => (
                  <button
                    key={style.value}
                    className={`${styles.optionCard} ${formData.trainingStyle === style.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("trainingStyle", style.value)}
                  >
                    <div className={styles.optionIcon}>{style.icon}</div>
                    <div className={styles.optionTitle}>{style.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Motivation */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Primary Goal</label>
              <div className={styles.optionGrid}>
                {motivations.map((goal) => (
                  <button
                    key={goal.value}
                    className={`${styles.optionCard} ${formData.motivation === goal.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("motivation", goal.value)}
                  >
                    <div className={styles.optionIcon}>{goal.icon}</div>
                    <div className={styles.optionTitle}>{goal.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Sparkles size={18} />
                Additional Notes (Optional)
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Any specific requirements, injuries, or preferences?"
                value={formData.customMessage}
                onChange={(e) => handleInputChange("customMessage", e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <button
            className={styles.generateButton}
            onClick={generateFitnessPlan}
            disabled={
              isGenerating || !formData.age || !formData.height || !formData.bodyweight || !formData.activityLevel
            }
          >
            {isGenerating ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Generating Your Plan...
              </div>
            ) : (
              <>
                Generate My Fitness Plan
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FitnessPlanner
