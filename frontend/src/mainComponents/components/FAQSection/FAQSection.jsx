"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import styles from "./FAQSection.module.css"


const faqs= [
  {
    question: "How do the AI tools work?",
    answer:
      "Our AI tools use advanced machine learning algorithms to analyze your input and provide intelligent, personalized results. Each tool is specifically trained for its domain to ensure maximum accuracy and relevance.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption and never store your personal data. All processing happens in real-time, and your information is immediately discarded after generating results.",
  },
  {
    question: "Can I use multiple AI tools simultaneously?",
    answer:
      "Yes! Depending on your plan, you can access multiple AI tools at the same time. Professional and Enterprise plans offer unlimited concurrent usage across all 8 tools.",
  },
  {
    question: "What happens if I exceed my monthly usage limit?",
    answer:
      "If you approach your limit, we'll notify you in advance. You can either upgrade your plan or wait for the next billing cycle. We never cut off access abruptly.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team for a full refund, no questions asked.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer:
      "Our AI tools maintain a 95%+ accuracy rate across all domains. We continuously train and improve our models based on user feedback and the latest research.",
  },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently Asked <span className={styles.gradient}>Questions</span>
          </h2>
          <p className={styles.subtitle}>Everything you need to know about our AI tools and platform</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}>
              <button className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contactSupport}>
          <p>Still have questions?</p>
          <button className={styles.supportButton}>Contact Support</button>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
