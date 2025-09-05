"use client"

import { useState } from "react"
import { Code, Cpu, Zap, Target, AlertCircle, Settings, Clock, Database, Palette, Plus } from "lucide-react"
import CodeAdviceResult from "./CodeAdviceResult/CodeAdviceResult"
import styles from "./CodeAdvice.module.css"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const CodeAdvice = () => {
  const navigate = useNavigate();
  const onBack = ()=>{
    navigate('/');
  }
  const [formData, setFormData] = useState({
    language: "",
    problemDescription: "",
    codeContext: "",
    desiredOutput: "",
    errorMessages: "",
    frameworks: "",
    timeComplexity: "",
    spaceComplexity: "",
    codeStyle: "",
    additionalConstraints: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [generatedAdvice, setGeneratedAdvice] = useState(null)

  const languages = [
    { value: "javascript", label: "JavaScript", color: "#f7df1e" },
    { value: "python", label: "Python", color: "#3776ab" },
    { value: "java", label: "Java", color: "#ed8b00" },
    { value: "cpp", label: "C++", color: "#00599c" },
    { value: "csharp", label: "C#", color: "#239120" },
    { value: "go", label: "Go", color: "#00add8" },
    { value: "rust", label: "Rust", color: "#000000" },
    { value: "typescript", label: "TypeScript", color: "#3178c6" },
    { value: "php", label: "PHP", color: "#777bb4" },
    { value: "ruby", label: "Ruby", color: "#cc342d" },
  ]

  const complexityOptions = [
    { value: "O(1)", label: "O(1) - Constant" },
    { value: "O(log n)", label: "O(log n) - Logarithmic" },
    { value: "O(n)", label: "O(n) - Linear" },
    { value: "O(n log n)", label: "O(n log n) - Linearithmic" },
    { value: "O(n²)", label: "O(n²) - Quadratic" },
    { value: "O(2^n)", label: "O(2^n) - Exponential" },
    { value: "not-sure", label: "Not sure" },
  ]

  const codeStyles = [
    { value: "clean", label: "Clean & Readable", icon: "✨" },
    { value: "performance", label: "Performance Optimized", icon: "⚡" },
    { value: "functional", label: "Functional Programming", icon: "🔧" },
    { value: "oop", label: "Object-Oriented", icon: "🏗️" },
    { value: "minimal", label: "Minimal & Concise", icon: "📦" },
    { value: "enterprise", label: "Enterprise Standard", icon: "🏢" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateAdvice = async () => {
    setIsGenerating(true)

     try {
    const res = await fetch('/api/code', {
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

    const codeAdviceData = {
      title: data.content.title || `${formData.language} Code Optimization`,
      summary: data.content.summary || 'Code analysis and optimization',
      metadata: {
        language: data.content.metadata.language || formData.language,
        complexity: {
          time: data.content.metadata.complexity.time || 'O(n)',
          space: data.content.metadata.complexity.space || 'O(1)'
        },
        generatedAt: data.content.metadata.generatedAt || new Date().toISOString()
      },
      sections: data.content.sections || []
    };

    setGeneratedAdvice(codeAdviceData);

    setIsGenerating(false)
    setShowResult(true)
  } catch (error) {
    console.error('Error generating code advice:', error);
    alert('Failed to generate code advice. Please try again.');
  } finally {
    setIsGenerating(false);
  }}

  if (showResult && generatedAdvice) {
    return <CodeAdviceResult advice={generatedAdvice} onBack={() => setShowResult(false)} />
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
            <Code className={styles.codeIcon} />
          </div>
          <h1 className={styles.title}>AI Code Advisor</h1>
          <p className={styles.subtitle}>
            Get intelligent code recommendations, optimizations, and best practices tailored to your specific needs
          </p>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Describe Your Code Challenge</h2>
            <p>Fill in the details below to get personalized code advice</p>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Code size={16} />
                Programming Language
                <span className={styles.required}>*</span>
              </label>
              <div className={styles.languageGrid}>
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    className={`${styles.languageCard} ${formData.language === lang.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("language", lang.value)}
                    style={{ "--lang-color": lang.color }}
                  >
                    <div className={styles.languageDot}></div>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Target size={16} />
                Problem Description
                <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Describe the problem you're trying to solve (e.g., 'Find the longest substring without repeating characters')"
                value={formData.problemDescription}
                onChange={(e) => handleInputChange("problemDescription", e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Settings size={16} />
                Current Code Context
                <span className={styles.optional}>Optional</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Paste your current code or describe your current approach"
                value={formData.codeContext}
                onChange={(e) => handleInputChange("codeContext", e.target.value)}
                rows={6}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Zap size={16} />
                Desired Output/Behavior
                <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Describe what you want your code to achieve or output"
                value={formData.desiredOutput}
                onChange={(e) => handleInputChange("desiredOutput", e.target.value)}
                rows={3}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <AlertCircle size={16} />
                Error Messages
                <span className={styles.optional}>Optional</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Paste any error messages you're encountering"
                value={formData.errorMessages}
                onChange={(e) => handleInputChange("errorMessages", e.target.value)}
                rows={3}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Plus size={16} />
                Frameworks/Libraries
                <span className={styles.optional}>Optional</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., React, Express, NumPy, Spring Boot"
                value={formData.frameworks}
                onChange={(e) => handleInputChange("frameworks", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Clock size={16} />
                Preferred Time Complexity
                <span className={styles.optional}>Optional</span>
              </label>
              <select
                className={styles.select}
                value={formData.timeComplexity}
                onChange={(e) => handleInputChange("timeComplexity", e.target.value)}
              >
                <option value="">Select time complexity</option>
                {complexityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Database size={16} />
                Preferred Space Complexity
                <span className={styles.optional}>Optional</span>
              </label>
              <select
                className={styles.select}
                value={formData.spaceComplexity}
                onChange={(e) => handleInputChange("spaceComplexity", e.target.value)}
              >
                <option value="">Select space complexity</option>
                {complexityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Palette size={16} />
                Preferred Code Style
                <span className={styles.optional}>Optional</span>
              </label>
              <div className={styles.styleGrid}>
                {codeStyles.map((style) => (
                  <button
                    key={style.value}
                    className={`${styles.styleCard} ${formData.codeStyle === style.value ? styles.selected : ""}`}
                    onClick={() => handleInputChange("codeStyle", style.value)}
                  >
                    <span className={styles.styleIcon}>{style.icon}</span>
                    <span className={styles.styleLabel}>{style.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Cpu size={16} />
                Additional Constraints
                <span className={styles.optional}>Optional</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Any additional requirements, constraints, or preferences (e.g., 'Must be thread-safe', 'Avoid external dependencies')"
                value={formData.additionalConstraints}
                onChange={(e) => handleInputChange("additionalConstraints", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <button
            className={styles.generateButton}
            onClick={generateAdvice}
            disabled={isGenerating || !formData.language || !formData.problemDescription || !formData.desiredOutput}
          >
            {isGenerating ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Analyzing & Generating Advice...
              </div>
            ) : (
              <>
                <Code size={18} />
                Get AI Code Advice
                <Zap size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CodeAdvice
