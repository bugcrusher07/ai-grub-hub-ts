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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock generated advice
    const mockAdvice = {
      title: "Code Optimization Recommendations",
      summary: "Based on your requirements, here are optimized solutions and best practices for your code.",
      sections: [
        {
          title: "Optimized Solution",
          type: "code",
          content: `// Optimized ${formData.language} solution
function optimizedSolution(input) {
    // Time Complexity: ${formData.timeComplexity || "O(n)"}
    // Space Complexity: ${formData.spaceComplexity || "O(1)"}

    ${formData.problemDescription ? `// Problem: ${formData.problemDescription}` : ""}

    // Implementation here
    const result = processInput(input);
    return result;
}

// Helper function
function processInput(data) {
    // Efficient processing logic
    return data.map(item => item * 2);
}`,
        },
        {
          title: "Key Improvements",
          type: "list",
          content: [
            "Reduced time complexity from O(n²) to O(n) using hash map lookup",
            "Eliminated unnecessary nested loops",
            "Added proper error handling and input validation",
            "Implemented memory-efficient data structures",
            "Applied modern ES6+ features for cleaner syntax",
          ],
        },
        {
          title: "Performance Analysis",
          type: "analysis",
          content: {
            timeComplexity: formData.timeComplexity || "O(n)",
            spaceComplexity: formData.spaceComplexity || "O(1)",
            improvements: [
              { metric: "Execution Time", before: "150ms", after: "45ms", improvement: "70%" },
              { metric: "Memory Usage", before: "2.5MB", after: "1.2MB", improvement: "52%" },
              { metric: "Code Lines", before: "85", after: "42", improvement: "51%" },
            ],
          },
        },
        {
          title: "Best Practices Applied",
          type: "practices",
          content: [
            {
              title: "Error Handling",
              description: "Added comprehensive try-catch blocks and input validation",
              code: "if (!input || input.length === 0) throw new Error('Invalid input');",
            },
            {
              title: "Code Readability",
              description: "Used descriptive variable names and added meaningful comments",
              code: "const processedResults = data.filter(isValidItem);",
            },
            {
              title: "Performance Optimization",
              description: "Implemented efficient algorithms and data structures",
              code: "const lookup = new Map(); // O(1) lookup time",
            },
          ],
        },
        {
          title: "Alternative Approaches",
          type: "alternatives",
          content: [
            {
              title: "Recursive Solution",
              pros: ["Elegant and readable", "Natural for tree-like problems"],
              cons: ["Higher space complexity", "Risk of stack overflow"],
              useCase: "When dealing with hierarchical data structures",
            },
            {
              title: "Iterative Solution",
              pros: ["Lower space complexity", "Better performance"],
              cons: ["More complex logic", "Harder to understand"],
              useCase: "When performance is critical and data is large",
            },
          ],
        },
        {
          title: "Testing Recommendations",
          type: "testing",
          content: `// Unit tests for the solution
describe('optimizedSolution', () => {
    test('handles empty input', () => {
        expect(() => optimizedSolution([])).toThrow('Invalid input');
    });

    test('processes valid input correctly', () => {
        const input = [1, 2, 3];
        const expected = [2, 4, 6];
        expect(optimizedSolution(input)).toEqual(expected);
    });

    test('handles large datasets efficiently', () => {
        const largeInput = Array.from({length: 10000}, (_, i) => i);
        const start = performance.now();
        optimizedSolution(largeInput);
        const end = performance.now();
        expect(end - start).toBeLessThan(100); // Should complete in <100ms
    });
});`,
        },
      ],
      metadata: {
        language: formData.language,
        complexity: {
          time: formData.timeComplexity || "O(n)",
          space: formData.spaceComplexity || "O(1)",
        },
        style: formData.codeStyle,
        frameworks: formData.frameworks,
        generatedAt: new Date().toISOString(),
      },
    }

    setGeneratedAdvice(mockAdvice)
    setIsGenerating(false)
    setShowResult(true)
  }

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
            {/* Programming Language - Required */}
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

            {/* Problem Description - Required */}
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

            {/* Code Context - Optional */}
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

            {/* Desired Output - Required */}
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

            {/* Error Messages - Optional */}
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

            {/* Frameworks - Optional */}
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

            {/* Time Complexity - Optional */}
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

            {/* Space Complexity - Optional */}
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

            {/* Code Style - Optional */}
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

            {/* Additional Constraints - Optional */}
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
