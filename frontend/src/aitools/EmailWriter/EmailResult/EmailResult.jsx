"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Download, Edit, Send, CheckCircle, Mail, Clock, BarChart3 } from "lucide-react"
import styles from "./EmailResult.module.css"

const EmailResult = ({ email, onBack }) => {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedEmail, setEditedEmail] = useState(email.body)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${editedEmail}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadEmail = () => {
    const element = document.createElement("a")
    const file = new Blob([`Subject: ${email.subject}\n\n${editedEmail}`], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "generated-email.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
            <Mail className={styles.mailIcon} />
          </div>
          <h1 className={styles.title}>Your Email is Ready</h1>
          <p className={styles.subtitle}>Review, edit, and use your AI-generated email</p>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.emailSection}>
            <div className={styles.emailHeader}>
              <h2>Generated Email</h2>
              <div className={styles.actions}>
                <button className={styles.actionButton} onClick={() => setIsEditing(!isEditing)}>
                  <Edit size={16} />
                  {isEditing ? "Preview" : "Edit"}
                </button>
                <button className={styles.actionButton} onClick={copyToClipboard}>
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button className={styles.actionButton} onClick={downloadEmail}>
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>

            <div className={styles.emailContainer}>
              <div className={styles.subjectLine}>
                <strong>Subject:</strong> {email.subject}
              </div>

              {isEditing ? (
                <textarea
                  className={styles.emailEditor}
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  rows={15}
                />
              ) : (
                <div className={styles.emailPreview}>
                  <pre className={styles.emailText}>{editedEmail}</pre>
                </div>
              )}
            </div>

            <div className={styles.emailFooter}>
              <button className={styles.sendButton}>
                <Send size={18} />
                Open in Email Client
              </button>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.statsCard}>
              <h3 className={styles.statsTitle}>
                <BarChart3 size={18} />
                Email Analytics
              </h3>
              <div className={styles.statsList}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Type</span>
                  <span className={styles.statValue}>{email.metadata.type}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Tone</span>
                  <span className={styles.statValue}>{email.metadata.tone}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Word Count</span>
                  <span className={styles.statValue}>{email.metadata.wordCount}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Reading Time</span>
                  <span className={styles.statValue}>{email.metadata.readingTime}</span>
                </div>
              </div>
            </div>

            <div className={styles.tipsCard}>
              <h3 className={styles.tipsTitle}>
                <Clock size={18} />
                Email Tips
              </h3>
              <ul className={styles.tipsList}>
                <li>Review the email for accuracy before sending</li>
                <li>Personalize the greeting with the recipient's name</li>
                <li>Double-check all dates and details</li>
                <li>Consider the timing of when you send the email</li>
                <li>Add your signature before sending</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailResult
