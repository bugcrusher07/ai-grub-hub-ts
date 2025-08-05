"use client"

import { useState } from "react"
import {
  Heart,
  Brain,
  Sun,
  Users,
  Shield,
  Flower,
  Sparkles,
  ArrowRight,
  User,
  Clock,
  MessageCircle,
  Activity,
  Home,
  Briefcase,
  Coffee,
} from "lucide-react"
import TherapyResult from "./TherapyResult/TherapyResult"
import styles from "./AITherapist.module.css"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const AITherapist = () => {
      const navigate = useNavigate();
  const onBack = ()=>{
    navigate('/');
  }
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    primaryConcern: "",
    emotionalState: "",
    stressLevel: "",
    sleepQuality: "",
    supportSystem: "",
    previousTherapy: "",
    triggerSituations: "",
    copingMechanisms: "",
    goals: "",
    timeframe: "",
    sessionType: "",
    communicationStyle: "",
    lifeAreas: [],
    symptoms: [],
    frequency: "",
    intensity: "",
    additionalContext: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState(null)

  const emotionalStates = [
    { value: "anxious", label: "Anxious", icon: "😰", color: "#fbbf24" },
    { value: "depressed", label: "Depressed", icon: "😔", color: "#6b7280" },
    { value: "stressed", label: "Stressed", icon: "😤", color: "#ef4444" },
    { value: "overwhelmed", label: "Overwhelmed", icon: "🤯", color: "#f59e0b" },
    { value: "lonely", label: "Lonely", icon: "😞", color: "#8b5cf6" },
    { value: "confused", label: "Confused", icon: "😕", color: "#06b6d4" },
    { value: "angry", label: "Angry", icon: "😠", color: "#dc2626" },
    { value: "hopeful", label: "Hopeful", icon: "🙂", color: "#10b981" },
  ]

  const stressLevels = [
    { value: "1", label: "Very Low", color: "#10b981", description: "Feeling calm and relaxed" },
    { value: "2", label: "Low", color: "#84cc16", description: "Manageable daily stress" },
    { value: "3", label: "Moderate", color: "#eab308", description: "Noticeable but manageable" },
    { value: "4", label: "High", color: "#f97316", description: "Significantly impacting daily life" },
    { value: "5", label: "Very High", color: "#ef4444", description: "Overwhelming and difficult to cope" },
  ]

  const sessionTypes = [
    { value: "crisis", label: "Crisis Support", icon: "🚨", description: "Immediate emotional support needed" },
    { value: "general", label: "General Wellness", icon: "🌱", description: "Overall mental health improvement" },
    { value: "specific", label: "Specific Issue", icon: "🎯", description: "Focused on particular concern" },
    { value: "maintenance", label: "Maintenance", icon: "🔄", description: "Ongoing support and check-in" },
  ]

  const communicationStyles = [
    { value: "gentle", label: "Gentle & Nurturing", icon: "🤗", description: "Soft, caring approach" },
    { value: "direct", label: "Direct & Practical", icon: "💪", description: "Straightforward guidance" },
    { value: "exploratory", label: "Exploratory & Reflective", icon: "🔍", description: "Deep self-discovery" },
    { value: "solution-focused", label: "Solution-Focused", icon: "⚡", description: "Goal-oriented approach" },
  ]

  const lifeAreaOptions = [
    { value: "relationships", label: "Relationships", icon: <Users size={16} /> },
    { value: "work", label: "Work/Career", icon: <Briefcase size={16} /> },
    { value: "family", label: "Family", icon: <Home size={16} /> },
    { value: "health", label: "Physical Health", icon: <Activity size={16} /> },
    { value: "finances", label: "Finances", icon: <Coffee size={16} /> },
    { value: "self-esteem", label: "Self-Esteem", icon: <Heart size={16} /> },
    { value: "life-purpose", label: "Life Purpose", icon: <Sun size={16} /> },
    { value: "social", label: "Social Life", icon: <MessageCircle size={16} /> },
  ]

  const symptomOptions = [
    "Difficulty sleeping",
    "Loss of appetite",
    "Fatigue",
    "Difficulty concentrating",
    "Mood swings",
    "Social withdrawal",
    "Panic attacks",
    "Intrusive thoughts",
    "Physical tension",
    "Irritability",
    "Feeling hopeless",
    "Racing thoughts",
    "Avoidance behaviors",
    "Emotional numbness",
    "Restlessness",
    "Memory issues",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }




  const generateTherapyPlan = async () => {
  setIsGenerating(true);

  try {
    const res = await fetch('/api/therapy-advice', {
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


    setGeneratedPlan(data.content);
    setShowResult(true);

  } catch (error) {
    console.error('Error generating therapy plan:', error);
    alert('Failed to generate therapy plan. Please try again.');
  } finally {
    setIsGenerating(false);
  }
};

  if (showResult && generatedPlan) {
    return <TherapyResult plan={generatedPlan} onBack={() => setShowResult(false)} />
  }

  return (
    <div className={styles.container}>
       <button className={styles.backButton} onClick={onBack} >
          <ArrowLeft size={20} />
          Home
        </button>
      <div className={styles.header}>
        <div className={styles.backgroundElements}>
          <div className={styles.floatingElement} style={{ "--delay": "0s", "--x": "10%", "--y": "20%" }}>
            🌸
          </div>
          <div className={styles.floatingElement} style={{ "--delay": "2s", "--x": "80%", "--y": "30%" }}>
            🦋
          </div>
          <div className={styles.floatingElement} style={{ "--delay": "4s", "--x": "20%", "--y": "70%" }}>
            🌿
          </div>
          <div className={styles.floatingElement} style={{ "--delay": "6s", "--x": "90%", "--y": "80%" }}>
            ✨
          </div>
        </div>

        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Heart className={styles.heartIcon} />
          </div>
          <h1 className={styles.title}>
            Your Safe Space for
            <span className={styles.titleGradient}>Mental Wellness</span>
          </h1>
          <p className={styles.subtitle}>
            A compassionate AI companion to support your mental health journey. You're not alone, and your feelings are
            valid.
          </p>
          <div className={styles.supportMessage}>
            <Shield size={16} />
            <span>Confidential • Judgment-free • Available 24/7</span>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <Flower className={styles.formIcon} />
            <h2>Let's understand how you're feeling</h2>
            <p>Take your time. Share only what feels comfortable for you.</p>
          </div>

          <div className={styles.formGrid}>
            {/* Personal Information */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <User size={18} />
                About You
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What would you like me to call you?
                  <span className={styles.optional}>Optional</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Your preferred name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Age range
                  <span className={styles.optional}>Optional</span>
                </label>
                <select
                  className={styles.select}
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                >
                  <option value="">Select age range</option>
                  <option value="13-17">13-17</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55-64">55-64</option>
                  <option value="65+">65+</option>
                </select>
              </div>
            </div>

            {/* Current Emotional State */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Brain size={18} />
                How You're Feeling Right Now
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What's your primary concern today?
                  <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Share what's on your mind. There's no judgment here..."
                  value={formData.primaryConcern}
                  onChange={(e) => handleInputChange("primaryConcern", e.target.value)}
                  rows={4}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Which emotion best describes how you're feeling?
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.emotionGrid}>
                  {emotionalStates.map((emotion) => (
                    <button
                      key={emotion.value}
                      className={`${styles.emotionCard} ${formData.emotionalState === emotion.value ? styles.selected : ""}`}
                      onClick={() => handleInputChange("emotionalState", emotion.value)}
                      style={{ "--emotion-color": emotion.color }}
                    >
                      <span className={styles.emotionIcon}>{emotion.icon}</span>
                      <span className={styles.emotionLabel}>{emotion.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Current stress level (1-5)
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.stressGrid}>
                  {stressLevels.map((level) => (
                    <button
                      key={level.value}
                      className={`${styles.stressCard} ${formData.stressLevel === level.value ? styles.selected : ""}`}
                      onClick={() => handleInputChange("stressLevel", level.value)}
                      style={{ "--stress-color": level.color }}
                    >
                      <div className={styles.stressLevel}>{level.value}</div>
                      <div className={styles.stressLabel}>{level.label}</div>
                      <div className={styles.stressDescription}>{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Life Areas Affected */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Activity size={18} />
                Areas of Life Affected
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Which areas of your life are being impacted?
                  <span className={styles.optional}>Select all that apply</span>
                </label>
                <div className={styles.lifeAreasGrid}>
                  {lifeAreaOptions.map((area) => (
                    <button
                      key={area.value}
                      className={`${styles.lifeAreaCard} ${formData.lifeAreas.includes(area.value) ? styles.selected : ""}`}
                      onClick={() => handleMultiSelect("lifeAreas", area.value)}
                    >
                      <div className={styles.lifeAreaIcon}>{area.icon}</div>
                      <span className={styles.lifeAreaLabel}>{area.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Clock size={18} />
                Symptoms & Experiences
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What symptoms or experiences are you having?
                  <span className={styles.optional}>Select all that apply</span>
                </label>
                <div className={styles.symptomsGrid}>
                  {symptomOptions.map((symptom) => (
                    <button
                      key={symptom}
                      className={`${styles.symptomCard} ${formData.symptoms.includes(symptom) ? styles.selected : ""}`}
                      onClick={() => handleMultiSelect("symptoms", symptom)}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  How often are you experiencing these feelings?
                  <span className={styles.optional}>Optional</span>
                </label>
                <select
                  className={styles.select}
                  value={formData.frequency}
                  onChange={(e) => handleInputChange("frequency", e.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="rarely">Rarely (once a month or less)</option>
                  <option value="sometimes">Sometimes (a few times a month)</option>
                  <option value="often">Often (weekly)</option>
                  <option value="daily">Daily</option>
                  <option value="constantly">Almost constantly</option>
                </select>
              </div>
            </div>

            {/* Support & Background */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Users size={18} />
                Support & Background
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Do you have people you can talk to?
                  <span className={styles.optional}>Optional</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Tell me about your support system - friends, family, or others you trust..."
                  value={formData.supportSystem}
                  onChange={(e) => handleInputChange("supportSystem", e.target.value)}
                  rows={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Have you tried therapy or counseling before?
                  <span className={styles.optional}>Optional</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Share any previous experiences with mental health support..."
                  value={formData.previousTherapy}
                  onChange={(e) => handleInputChange("previousTherapy", e.target.value)}
                  rows={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What usually triggers these feelings?
                  <span className={styles.optional}>Optional</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Specific situations, people, thoughts, or events that tend to trigger difficult emotions..."
                  value={formData.triggerSituations}
                  onChange={(e) => handleInputChange("triggerSituations", e.target.value)}
                  rows={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What helps you feel better?
                  <span className={styles.optional}>Optional</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Activities, people, places, or strategies that usually help you cope..."
                  value={formData.copingMechanisms}
                  onChange={(e) => handleInputChange("copingMechanisms", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Goals & Preferences */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Sun size={18} />
                Your Goals & Preferences
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What would you like to achieve?
                  <span className={styles.optional}>Optional</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="What would feeling better look like for you? What are your hopes for this conversation?"
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  rows={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  What type of support do you need today?
                  <span className={styles.optional}>Optional</span>
                </label>
                <div className={styles.sessionGrid}>
                  {sessionTypes.map((session) => (
                    <button
                      key={session.value}
                      className={`${styles.sessionCard} ${formData.sessionType === session.value ? styles.selected : ""}`}
                      onClick={() => handleInputChange("sessionType", session.value)}
                    >
                      <span className={styles.sessionIcon}>{session.icon}</span>
                      <div className={styles.sessionContent}>
                        <div className={styles.sessionLabel}>{session.label}</div>
                        <div className={styles.sessionDescription}>{session.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  How would you like me to communicate with you?
                  <span className={styles.optional}>Optional</span>
                </label>
                <div className={styles.communicationGrid}>
                  {communicationStyles.map((style) => (
                    <button
                      key={style.value}
                      className={`${styles.communicationCard} ${formData.communicationStyle === style.value ? styles.selected : ""}`}
                      onClick={() => handleInputChange("communicationStyle", style.value)}
                    >
                      <span className={styles.communicationIcon}>{style.icon}</span>
                      <div className={styles.communicationContent}>
                        <div className={styles.communicationLabel}>{style.label}</div>
                        <div className={styles.communicationDescription}>{style.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Anything else you'd like me to know?
                  <span className={styles.optional}>Optional</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Any additional context, concerns, or information that might help me support you better..."
                  value={formData.additionalContext}
                  onChange={(e) => handleInputChange("additionalContext", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className={styles.submitSection}>
            <div className={styles.encouragement}>
              <Sparkles className={styles.encouragementIcon} />
              <p>You're taking a brave step by reaching out. I'm here to support you with care and understanding.</p>
            </div>

            <button
              className={styles.generateButton}
              onClick={generateTherapyPlan}
              disabled={isGenerating || !formData.primaryConcern || !formData.emotionalState || !formData.stressLevel}
            >
              {isGenerating ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  Creating your personalized support plan...
                </div>
              ) : (
                <>
                  <Heart size={18} />
                  Get My Wellness Plan
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className={styles.disclaimer}>
              <Shield size={14} />
              <p>
                This AI tool provides supportive guidance but is not a replacement for professional therapy. If you're
                in crisis, please contact 988 (Suicide & Crisis Lifeline) or emergency services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITherapist
