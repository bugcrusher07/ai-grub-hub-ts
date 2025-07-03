import { useState } from "react"
import { Mail, Send, Sparkles, ArrowRight, User, MessageSquare, Target, Clock, FileText } from "lucide-react"
import EmailResult from "./EmailResult/EmailResult"
import styles from "./EmailWriter.module.css"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const EmailWriter = () => {
     const navigate = useNavigate();
  const onBack = ()=>{
    navigate('/');
  }
  const [formData, setFormData] = useState({
    emailType: "",
    tone: "",
    recipient: "",
    subject: "",
    mainPurpose: "",
    keyPoints: "",
    length: "",
    context: "",
    callToAction: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState(null)

  const emailTypes = [
    { value: "business", label: "Business Email", desc: "Professional communication" },
    { value: "follow-up", label: "Follow-up", desc: "Following up on previous conversation" },
    { value: "cold-outreach", label: "Cold Outreach", desc: "First-time contact" },
    { value: "thank-you", label: "Thank You", desc: "Expressing gratitude" },
    { value: "request", label: "Request", desc: "Asking for something" },
    { value: "apology", label: "Apology", desc: "Making amends" },
  ]

  const tones = [
    { value: "professional", label: "Professional", icon: "💼" },
    { value: "friendly", label: "Friendly", icon: "😊" },
    { value: "formal", label: "Formal", icon: "🎩" },
    { value: "casual", label: "Casual", icon: "👋" },
    { value: "persuasive", label: "Persuasive", icon: "🎯" },
    { value: "apologetic", label: "Apologetic", icon: "🙏" },
  ]

  const recipients = [
    { value: "boss", label: "Boss/Manager" },
    { value: "colleague", label: "Colleague" },
    { value: "client", label: "Client" },
    { value: "customer", label: "Customer" },
    { value: "vendor", label: "Vendor/Supplier" },
    { value: "team", label: "Team Members" },
  ]

  const lengths = [
    { value: "short", label: "Short", desc: "2-3 sentences" },
    { value: "medium", label: "Medium", desc: "1-2 paragraphs" },
    { value: "long", label: "Long", desc: "3+ paragraphs" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // const generateEmail = async () => {
  //   setIsGenerating(true)
  //     const res = await fetch('http://localhost:3000/api/email', {
  //       method: 'POST',
  //       headers: { // Fixed 'header' to 'headers'
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //   setGeneratedEmail(res)
  //   setIsGenerating(false)
  //   setShowResult(true)
  // }
const generateEmail = async () => {
  setIsGenerating(true)

  try {
    const res = await fetch('http://localhost:3000/api/email', {
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

    const emailData = {
      subject: data.content.subject || formData.subject,
      body: data.content.body || data.content,
      greeting: data.content.greeting || '',
      closing: data.content.closing || '',
      metadata: {
        type: formData.emailType,
        tone: formData.tone,
        wordCount: data.content.body ? data.content.body.split(' ').length : 0,
        readingTime: data.content.body ? Math.ceil(data.content.body.split(' ').length / 200) + ' min' : '1 min'
      }
    };

    setGeneratedEmail(emailData);
    setShowResult(true);

  } catch (error) {
    console.error('Error generating email:', error);
    // Handle error - show error message to user
    alert('Failed to generate email. Please try again.');
  } finally {
    setIsGenerating(false);
  }
}
  if (showResult && generatedEmail) {
    return <EmailResult email={generatedEmail} onBack={() => setShowResult(false)} />
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack} >
          <ArrowLeft size={20} />
          Home
        </button>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Mail className={styles.mailIcon} />
          </div>
          <h1 className={styles.title}>AI Email Writer</h1>
          <p className={styles.subtitle}>
            Generate professional emails in seconds. Just tell us what you need and we'll craft the perfect message.
          </p>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2>Email Configuration</h2>
            <p>Configure your email parameters</p>
          </div>

          <div className={styles.formGrid}>
            {/* Email Type */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <FileText size={16} />
                Email Type
                <span className={styles.required}>*</span>
              </label>
              <div className={styles.optionGrid}>
                {emailTypes.map((type) => (
                  <button
                    key={type.value}
                    className={`${styles.optionCard} ${formData.emailType === type.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("emailType", type.value)}
                  >
                    <div className={styles.optionTitle}>{type.label}</div>
                    <div className={styles.optionDesc}>{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MessageSquare size={16} />
                Tone
                <span className={styles.required}>*</span>
              </label>
              <div className={styles.optionGrid}>
                {tones.map((tone) => (
                  <button
                    key={tone.value}
                    className={`${styles.optionCard} ${formData.tone === tone.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("tone", tone.value)}
                  >
                    <div className={styles.optionIcon}>{tone.icon}</div>
                    <div className={styles.optionTitle}>{tone.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <User size={16} />
                Recipient
                <span className={styles.required}>*</span>
              </label>
              <select
                className={styles.select}
                value={formData.recipient}
                onChange={(e) => handleInputChange("recipient", e.target.value)}
              >
                <option value="">Select recipient type</option>
                {recipients.map((recipient) => (
                  <option key={recipient.value} value={recipient.value}>
                    {recipient.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Target size={16} />
                Subject Line
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter email subject (optional - we can generate one)"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>

            {/* Main Purpose */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Sparkles size={16} />
                Main Purpose
                <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="What is the main purpose of this email? (e.g., 'Request a meeting to discuss the project timeline')"
                value={formData.mainPurpose}
                onChange={(e) => handleInputChange("mainPurpose", e.target.value)}
                rows={3}
              />
            </div>

            {/* Key Points */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Key Points to Include</label>
              <textarea
                className={styles.textarea}
                placeholder="List key points separated by commas (e.g., 'budget constraints, timeline flexibility, team availability')"
                value={formData.keyPoints}
                onChange={(e) => handleInputChange("keyPoints", e.target.value)}
                rows={2}
              />
            </div>

            {/* Length */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Clock size={16} />
                Email Length
              </label>
              <div className={styles.optionGrid}>
                {lengths.map((length) => (
                  <button
                    key={length.value}
                    className={`${styles.optionCard} ${formData.length === length.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("length", length.value)}
                  >
                    <div className={styles.optionTitle}>{length.label}</div>
                    <div className={styles.optionDesc}>{length.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Context */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Additional Context</label>
              <textarea
                className={styles.textarea}
                placeholder="Any additional context or background information that would help craft a better email"
                value={formData.context}
                onChange={(e) => handleInputChange("context", e.target.value)}
                rows={3}
              />
            </div>

            {/* Call to Action */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Call to Action</label>
              <input
                type="text"
                className={styles.input}
                placeholder="What action do you want the recipient to take? (e.g., 'Please reply by Friday')"
                value={formData.callToAction}
                onChange={(e) => handleInputChange("callToAction", e.target.value)}
              />
            </div>
          </div>

          <button
            className={styles.generateButton}
            onClick={generateEmail}
            disabled={
              isGenerating || !formData.emailType || !formData.tone || !formData.recipient || !formData.mainPurpose
            }
          >
            {isGenerating ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Generating Email...
              </div>
            ) : (
              <>
                <Send size={18} />
                Generate Email
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailWriter
