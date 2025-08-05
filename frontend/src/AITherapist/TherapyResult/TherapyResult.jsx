"use client"

// import { Calendar } from "@/components/ui/calendar"
import { Calendar } from "lucide-react"

import { useState } from "react"
import {
  ArrowLeft,
  Download,
  Heart,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Book,
  Smartphone,
  Target,
  Brain,
  Lightbulb,
  Activity,
  Users,
  Sun,
  Flower2,
  Sparkles,
} from "lucide-react"
import styles from "./TherapyResult.module.css"

const TherapyResult = ({ plan, onBack }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [completedItems, setCompletedItems] = useState(new Set())
  console.log("plan.urgency level", plan.urgencyLevel, "plan.title ", plan.title);
  const toggleCompleted = (itemId) => {
    setCompletedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const downloadPlan = () => {
    const content = `# ${plan.title}

${plan.summary}

## Your Current Assessment
- Primary Concern: ${plan.sections[0]?.content?.primaryConcern || "Not specified"}
- Emotional State: ${plan.sections[0]?.content?.emotionalState || "Not specified"}
- Stress Level: ${plan.sections[0]?.content?.stressLevel || "Not specified"}/5

${plan.sections
  .map((section) => {
    let sectionContent = `## ${section.title}\n\n`

    if (section.type === "coping") {
      sectionContent += section.content
        .map(
          (technique) =>
            `### ${technique.technique}\n${technique.description}\n\n**Steps:**\n${technique.steps.map((step) => `- ${step}`).join("\n")}\n\n**When to use:** ${technique.whenToUse}\n`,
        )
        .join("\n")
    } else if (section.type === "recommendations") {
      sectionContent += `**Daily:**\n${section.content.daily.map((item) => `- ${item}`).join("\n")}\n\n`
      sectionContent += `**Weekly:**\n${section.content.weekly.map((item) => `- ${item}`).join("\n")}\n\n`
      sectionContent += `**Lifestyle:**\n${section.content.lifestyle.map((item) => `- ${item}`).join("\n")}\n`
    } else {
      sectionContent += JSON.stringify(section.content, null, 2)
    }

    return sectionContent
  })
  .join("\n\n")}

## Emergency Resources
- **Crisis Hotline:** 988 (Suicide & Crisis Lifeline)
- **Crisis Text Line:** Text HOME to 741741
- **Emergency:** 911

---
Generated on: ${new Date(plan.metadata.generatedAt).toLocaleString()}
This plan is personalized for your current needs. Please reach out to a mental health professional for ongoing support.
`

    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = `wellness-plan-${Date.now()}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getSectionIcon = (type) => {
    switch (type) {
      case "assessment":
        return <Brain size={20} />
      case "coping":
        return <Heart size={20} />
      case "recommendations":
        return <Target size={20} />
      case "cognitive":
        return <Lightbulb size={20} />
      case "selfcare":
        return <Flower2 size={20} />
      case "crisis":
        return <Shield size={20} />
      case "tracking":
        return <Activity size={20} />
      default:
        return <Sparkles size={20} />
    }
  }

  const getUrgencyColor = (level) => {
    switch (level) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const renderSectionContent = (section, index) => {
    switch (section.type) {
      case "assessment":
        return (
          <div className={styles.assessmentContainer}>
            <div className={styles.assessmentGrid}>
              <div className={styles.assessmentCard}>
                <h4>Primary Concern</h4>
                <p>{section.content.primaryConcern}</p>
              </div>
              <div className={styles.assessmentCard}>
                <h4>Emotional State</h4>
                <p className={styles.emotionalState}>{section.content.emotionalState}</p>
              </div>
              <div className={styles.assessmentCard}>
                <h4>Stress Level</h4>
                <div className={styles.stressIndicator}>
                  <span className={styles.stressNumber}>{section.content.stressLevel}</span>
                  <span className={styles.stressMax}>/5</span>
                </div>
              </div>
            </div>

            {section.content.affectedAreas?.length > 0 && (
              <div className={styles.affectedAreas}>
                <h4>Areas of Life Affected</h4>
                <div className={styles.areasList}>
                  {section.content.affectedAreas.map((area, i) => (
                    <span key={i} className={styles.areaTag}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {section.content.symptoms?.length > 0 && (
              <div className={styles.symptomsSection}>
                <h4>Current Symptoms</h4>
                <div className={styles.symptomsList}>
                  {section.content.symptoms.map((symptom, i) => (
                    <div key={i} className={styles.symptomItem}>
                      <CheckCircle size={16} />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.insights}>
              <h4>Key Insights</h4>
              <ul className={styles.insightsList}>
                {section.content.insights.map((insight, i) => (
                  <li key={i}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        )

      case "coping":
        return (
          <div className={styles.copingContainer}>
            {section.content.map((technique, i) => (
              <div key={i} className={styles.techniqueCard}>
                <div className={styles.techniqueHeader}>
                  <h4>{technique.technique}</h4>
                  <button
                    className={`${styles.completeButton} ${completedItems.has(`coping-${i}`) ? styles.completed : ""}`}
                    onClick={() => toggleCompleted(`coping-${i}`)}
                  >
                    <CheckCircle size={16} />
                    {completedItems.has(`coping-${i}`) ? "Practiced" : "Mark as Practiced"}
                  </button>
                </div>
                <p className={styles.techniqueDescription}>{technique.description}</p>

                <div className={styles.stepsSection}>
                  <h5>Steps:</h5>
                  <ol className={styles.stepsList}>
                    {technique.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className={styles.whenToUse}>
                  <Clock size={16} />
                  <span>
                    <strong>When to use:</strong> {technique.whenToUse}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )

      case "recommendations":
        return (
          <div className={styles.recommendationsContainer}>
            <div className={styles.recommendationSection}>
              <div className={styles.recommendationHeader}>
                <Sun size={20} />
                <h4>Daily Practices</h4>
              </div>
              <ul className={styles.recommendationsList}>
                {section.content.daily.map((item, i) => (
                  <li key={i} className={styles.recommendationItem}>
                    <button
                      className={`${styles.checkButton} ${completedItems.has(`daily-${i}`) ? styles.checked : ""}`}
                      onClick={() => toggleCompleted(`daily-${i}`)}
                    >
                      <CheckCircle size={16} />
                    </button>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.recommendationSection}>
              <div className={styles.recommendationHeader}>
                <Calendar size={20} />
                <h4>Weekly Goals</h4>
              </div>
              <ul className={styles.recommendationsList}>
                {section.content.weekly.map((item, i) => (
                  <li key={i} className={styles.recommendationItem}>
                    <button
                      className={`${styles.checkButton} ${completedItems.has(`weekly-${i}`) ? styles.checked : ""}`}
                      onClick={() => toggleCompleted(`weekly-${i}`)}
                    >
                      <CheckCircle size={16} />
                    </button>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.recommendationSection}>
              <div className={styles.recommendationHeader}>
                <Activity size={20} />
                <h4>Lifestyle Changes</h4>
              </div>
              <ul className={styles.recommendationsList}>
                {section.content.lifestyle.map((item, i) => (
                  <li key={i} className={styles.recommendationItem}>
                    <button
                      className={`${styles.checkButton} ${completedItems.has(`lifestyle-${i}`) ? styles.checked : ""}`}
                      onClick={() => toggleCompleted(`lifestyle-${i}`)}
                    >
                      <CheckCircle size={16} />
                    </button>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      case "cognitive":
        return (
          <div className={styles.cognitiveContainer}>
            {section.content.map((exercise, i) => (
              <div key={i} className={styles.cognitiveCard}>
                <h4>{exercise.situation}</h4>

                <div className={styles.thoughtComparison}>
                  <div className={styles.unhelpfulThought}>
                    <h5>Unhelpful Thought:</h5>
                    <p>"{exercise.unhelpfulThought}"</p>
                  </div>
                  <div className={styles.reframedThought}>
                    <h5>Reframed Thought:</h5>
                    <p>"{exercise.reframe}"</p>
                  </div>
                </div>

                <div className={styles.technique}>
                  <Lightbulb size={16} />
                  <span>
                    <strong>Technique:</strong> {exercise.technique}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )

      case "selfcare":
        return (
          <div className={styles.selfcareContainer}>
            <div className={styles.selfcareGrid}>
              <div className={styles.selfcareCategory}>
                <div className={styles.categoryHeader}>
                  <Activity size={20} />
                  <h4>Physical Self-Care</h4>
                </div>
                <ul className={styles.selfcareList}>
                  {section.content.physical.map((item, i) => (
                    <li key={i} className={styles.selfcareItem}>
                      <button
                        className={`${styles.checkButton} ${completedItems.has(`physical-${i}`) ? styles.checked : ""}`}
                        onClick={() => toggleCompleted(`physical-${i}`)}
                      >
                        <CheckCircle size={16} />
                      </button>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.selfcareCategory}>
                <div className={styles.categoryHeader}>
                  <Heart size={20} />
                  <h4>Emotional Self-Care</h4>
                </div>
                <ul className={styles.selfcareList}>
                  {section.content.emotional.map((item, i) => (
                    <li key={i} className={styles.selfcareItem}>
                      <button
                        className={`${styles.checkButton} ${completedItems.has(`emotional-${i}`) ? styles.checked : ""}`}
                        onClick={() => toggleCompleted(`emotional-${i}`)}
                      >
                        <CheckCircle size={16} />
                      </button>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.selfcareCategory}>
                <div className={styles.categoryHeader}>
                  <Users size={20} />
                  <h4>Social Self-Care</h4>
                </div>
                <ul className={styles.selfcareList}>
                  {section.content.social.map((item, i) => (
                    <li key={i} className={styles.selfcareItem}>
                      <button
                        className={`${styles.checkButton} ${completedItems.has(`social-${i}`) ? styles.checked : ""}`}
                        onClick={() => toggleCompleted(`social-${i}`)}
                      >
                        <CheckCircle size={16} />
                      </button>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.selfcareCategory}>
                <div className={styles.categoryHeader}>
                  <Sparkles size={20} />
                  <h4>Spiritual Self-Care</h4>
                </div>
                <ul className={styles.selfcareList}>
                  {section.content.spiritual.map((item, i) => (
                    <li key={i} className={styles.selfcareItem}>
                      <button
                        className={`${styles.checkButton} ${completedItems.has(`spiritual-${i}`) ? styles.checked : ""}`}
                        onClick={() => toggleCompleted(`spiritual-${i}`)}
                      >
                        <CheckCircle size={16} />
                      </button>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )

      case "crisis":
        return (
          <div className={styles.crisisContainer}>
            <div className={styles.crisisAlert}>
              <AlertTriangle size={24} />
              <div>
                <h4>Important: Crisis Support Information</h4>
                <p>If you're experiencing thoughts of self-harm or suicide, please reach out immediately.</p>
              </div>
            </div>

            <div className={styles.crisisSection}>
              <h4>Warning Signs to Watch For:</h4>
              <ul className={styles.warningList}>
                {section.content.warningSignsToWatch.map((sign, i) => (
                  <li key={i} className={styles.warningItem}>
                    <AlertTriangle size={16} />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.crisisSection}>
              <h4>Immediate Actions to Take:</h4>
              <div className={styles.emergencyContacts}>
                {section.content.immediateActions.map((action, i) => (
                  <div key={i} className={styles.emergencyCard}>
                    <Phone size={20} />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.crisisSection}>
              <h4>Your Safety Plan:</h4>
              <ol className={styles.safetyPlan}>
                {section.content.safetyPlan.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )

      case "tracking":
        return (
          <div className={styles.trackingContainer}>
            <div className={styles.trackingSection}>
              <div className={styles.trackingHeader}>
                <Sun size={20} />
                <h4>Daily Check-ins</h4>
              </div>
              <ul className={styles.trackingList}>
                {section.content.dailyCheckins.map((item, i) => (
                  <li key={i} className={styles.trackingItem}>
                    <CheckCircle size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.trackingSection}>
              <div className={styles.trackingHeader}>
                <Calendar size={20} />
                <h4>Weekly Reflections</h4>
              </div>
              <ul className={styles.trackingList}>
                {section.content.weeklyReflections.map((item, i) => (
                  <li key={i} className={styles.trackingItem}>
                    <CheckCircle size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.trackingSection}>
              <div className={styles.trackingHeader}>
                <Target size={20} />
                <h4>Monthly Goals</h4>
              </div>
              <ul className={styles.trackingList}>
                {section.content.monthlyGoals.map((item, i) => (
                  <li key={i} className={styles.trackingItem}>
                    <CheckCircle size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      default:
        return <div className={styles.defaultContent}>Content not available</div>
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backgroundElements}>
          <div className={styles.floatingElement} style={{ "--delay": "0s", "--x": "15%", "--y": "25%" }}>
            🌸
          </div>
          <div className={styles.floatingElement} style={{ "--delay": "3s", "--x": "85%", "--y": "35%" }}>
            🦋
          </div>
          <div className={styles.floatingElement} style={{ "--delay": "6s", "--x": "25%", "--y": "75%" }}>
            🌿
          </div>
        </div>

        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Assessment
        </button>

        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Heart className={styles.heartIcon} />
          </div>
          <h1 className={styles.title}>{plan.title}</h1>
          <p className={styles.subtitle}>{plan.summary}</p>

          <div className={styles.urgencyIndicator} style={{ "--urgency-color": getUrgencyColor(plan.urgencyLevel) }}>
            <Shield size={16} />
            <span>Support Level: {plan.urgencyLevel.charAt(0).toUpperCase() + plan.urgencyLevel.slice(1)}</span>
          </div>

          <button className={styles.downloadButton} onClick={downloadPlan}>
            <Download size={16} />
            Download Your Plan
          </button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {plan.sections.map((section, index) => (
              <button
                key={index}
                className={`${styles.tab} ${activeTab === index ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {getSectionIcon(section.type)}
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>{getSectionIcon(plan.sections[activeTab].type)}</div>
              <h2 className={styles.sectionTitle}>{plan.sections[activeTab].title}</h2>
            </div>

            <div className={styles.sectionContent}>{renderSectionContent(plan.sections[activeTab], activeTab)}</div>
          </div>
        </div>

        <div className={styles.resources}>
          <h3 className={styles.resourcesTitle}>
            <Book size={20} />
            Additional Resources
          </h3>

          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCategory}>
              <h4>
                <Smartphone size={16} />
                Helpful Apps
              </h4>
              <ul className={styles.resourceList}>
                {plan.resources.apps.map((app, i) => (
                  <li key={i} className={styles.resourceItem}>
                    <strong>{app.name}</strong> - {app.purpose}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.resourceCategory}>
              <h4>
                <Book size={16} />
                Recommended Reading
              </h4>
              <ul className={styles.resourceList}>
                {plan.resources.books.map((book, i) => (
                  <li key={i} className={styles.resourceItem}>
                    <strong>{book.title}</strong> by {book.author}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.resourceCategory}>
              <h4>
                <Phone size={16} />
                Crisis Support
              </h4>
              <ul className={styles.resourceList}>
                {plan.resources.hotlines.map((hotline, i) => (
                  <li key={i} className={styles.resourceItem}>
                    <strong>{hotline.name}</strong>
                    <br />
                    {hotline.number || hotline.contact} - {hotline.available}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.encouragementSection}>
          <div className={styles.encouragementCard}>
            <Sparkles className={styles.encouragementIcon} />
            <div className={styles.encouragementContent}>
              <h3>You're Taking Important Steps</h3>
              <p>
                Remember that healing is a journey, not a destination. Be patient and kind with yourself as you work
                through this plan. Every small step forward is progress worth celebrating.
              </p>
              <p>
                <strong>You are worthy of care, support, and happiness.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TherapyResult
