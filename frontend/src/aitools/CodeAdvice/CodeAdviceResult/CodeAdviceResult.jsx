"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Copy,
  Download,
  CheckCircle,
  Code,
  Zap,
  Clock,
  Database,
  TrendingUp,
  CheckSquare,
  Lightbulb,
  TestTube,
  Star,
} from "lucide-react"
import styles from "./CodeAdviceResult.module.css"

const CodeAdviceResult = ({ advice, onBack }) => {
  const [copiedSections, setCopiedSections] = useState(new Set())
  const [activeTab, setActiveTab] = useState(0)

  const copyToClipboard = async (content, sectionIndex) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedSections((prev) => new Set([...prev, sectionIndex]))
      setTimeout(() => {
        setCopiedSections((prev) => {
          const newSet = new Set(prev)
          newSet.delete(sectionIndex)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadAdvice = () => {
    const content = `# ${advice.title}

${advice.summary}

${advice.sections
  .map((section) => {
    let sectionContent = `## ${section.title}\n\n`

    if (section.type === "code") {
      sectionContent += `\`\`\`${advice.metadata.language}\n${section.content}\n\`\`\``
    } else if (section.type === "list") {
      sectionContent += section.content.map((item) => `- ${item}`).join("\n")
    } else if (section.type === "testing") {
      sectionContent += `\`\`\`${advice.metadata.language}\n${section.content}\n\`\`\``
    } else {
      sectionContent += JSON.stringify(section.content, null, 2)
    }

    return sectionContent
  })
  .join("\n\n")}

---
Generated on: ${new Date(advice.metadata.generatedAt).toLocaleString()}
Language: ${advice.metadata.language}
`

    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = `code-advice-${Date.now()}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getSectionIcon = (type) => {
    switch (type) {
      case "code":
        return <Code size={20} />
      case "list":
        return <CheckSquare size={20} />
      case "analysis":
        return <TrendingUp size={20} />
      case "practices":
        return <Star size={20} />
      case "alternatives":
        return <Lightbulb size={20} />
      case "testing":
        return <TestTube size={20} />
      default:
        return <Zap size={20} />
    }
  }

  const renderSectionContent = (section, index) => {
    switch (section.type) {
      case "code":
        return (
          <div className={styles.codeContainer}>
            <div className={styles.codeHeader}>
              <div className={styles.codeLanguage}>{advice.metadata.language}</div>
              <button className={styles.copyButton} onClick={() => copyToClipboard(section.content, index)}>
                {copiedSections.has(index) ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copiedSections.has(index) ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code>{section.content}</code>
            </pre>
          </div>
        )

      case "list":
        return (
          <ul className={styles.improvementsList}>
            {section.content.map((item, i) => (
              <li key={i} className={styles.improvementItem}>
                <CheckCircle className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )

      case "analysis":
        return (
          <div className={styles.analysisContainer}>
            <div className={styles.complexityInfo}>
              <div className={styles.complexityItem}>
                <Clock className={styles.complexityIcon} />
                <div>
                  <div className={styles.complexityLabel}>Time Complexity</div>
                  <div className={styles.complexityValue}>{section.content.timeComplexity}</div>
                </div>
              </div>
              <div className={styles.complexityItem}>
                <Database className={styles.complexityIcon} />
                <div>
                  <div className={styles.complexityLabel}>Space Complexity</div>
                  <div className={styles.complexityValue}>{section.content.spaceComplexity}</div>
                </div>
              </div>
            </div>

            <div className={styles.improvementsGrid}>
              {section.content.improvements.map((improvement, i) => (
                <div key={i} className={styles.improvementCard}>
                  <div className={styles.improvementHeader}>
                    <span className={styles.improvementMetric}>{improvement.metric}</span>
                    <span className={styles.improvementPercent}>+{improvement.improvement}</span>
                  </div>
                  <div className={styles.improvementValues}>
                    <span className={styles.beforeValue}>Before: {improvement.before}</span>
                    <span className={styles.afterValue}>After: {improvement.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "practices":
        return (
          <div className={styles.practicesContainer}>
            {section.content.map((practice, i) => (
              <div key={i} className={styles.practiceCard}>
                <h4 className={styles.practiceTitle}>{practice.title}</h4>
                <p className={styles.practiceDescription}>{practice.description}</p>
                <div className={styles.practiceCode}>
                  <code>{practice.code}</code>
                </div>
              </div>
            ))}
          </div>
        )

      case "alternatives":
        return (
          <div className={styles.alternativesContainer}>
            {section.content.map((alternative, i) => (
              <div key={i} className={styles.alternativeCard}>
                <h4 className={styles.alternativeTitle}>{alternative.title}</h4>
                <div className={styles.prosConsContainer}>
                  <div className={styles.prosContainer}>
                    <h5 className={styles.prosTitle}>Pros</h5>
                    <ul className={styles.prosList}>
                      {alternative.pros.map((pro, j) => (
                        <li key={j}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.consContainer}>
                    <h5 className={styles.consTitle}>Cons</h5>
                    <ul className={styles.consList}>
                      {alternative.cons.map((con, j) => (
                        <li key={j}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.useCase}>
                  <strong>Best for:</strong> {alternative.useCase}
                </div>
              </div>
            ))}
          </div>
        )

      case "testing":
        return (
          <div className={styles.codeContainer}>
            <div className={styles.codeHeader}>
              <div className={styles.codeLanguage}>Test Suite</div>
              <button className={styles.copyButton} onClick={() => copyToClipboard(section.content, index)}>
                {copiedSections.has(index) ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copiedSections.has(index) ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code>{section.content}</code>
            </pre>
          </div>
        )

      default:
        return <div className={styles.defaultContent}>{JSON.stringify(section.content, null, 2)}</div>
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Form
        </button>

        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Code className={styles.codeIcon} />
          </div>
          <h1 className={styles.title}>{advice.title}</h1>
          <p className={styles.subtitle}>{advice.summary}</p>

          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Language:</span>
              <span className={styles.metadataValue}>{advice.metadata.language}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Time Complexity:</span>
              <span className={styles.metadataValue}>{advice.metadata.complexity.time}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Space Complexity:</span>
              <span className={styles.metadataValue}>{advice.metadata.complexity.space}</span>
            </div>
          </div>

          <button className={styles.downloadButton} onClick={downloadAdvice}>
            <Download size={16} />
            Download Report
          </button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {advice.sections.map((section, index) => (
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
              <div className={styles.sectionIcon}>{getSectionIcon(advice.sections[activeTab].type)}</div>
              <h2 className={styles.sectionTitle}>{advice.sections[activeTab].title}</h2>
            </div>

            <div className={styles.sectionContent}>{renderSectionContent(advice.sections[activeTab], activeTab)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeAdviceResult
