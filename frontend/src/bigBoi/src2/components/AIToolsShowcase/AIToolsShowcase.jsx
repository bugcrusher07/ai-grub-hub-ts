"use client"

import { useState } from "react"
import { Dumbbell, Mail, Code, Apple, Film, Heart, FileText, Presentation, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "./AIToolsShowcase.module.css"


const aiTools= [
  {
    id: "fitness",
    name: "AI Fitness Plan",
    description: "Get personalized workout routines tailored to your goals and fitness level.",
    icon: <Dumbbell size={32} />,
    color: "#ef4444",
    features: ["Custom workouts", "Progress tracking", "Nutrition advice"],
  },
  {
    id: "email",
    name: "AI Email Letter",
    description: "Craft professional emails and letters with AI-powered writing assistance.",
    icon: <Mail size={32} />,
    color: "#3b82f6",
    features: ["Professional tone", "Grammar check", "Template library"],
  },
  {
    id: "debugging",
    name: "AI Code Debugging",
    description: "Debug your code faster with intelligent error detection and solutions.",
    icon: <Code size={32} />,
    color: "#10b981",
    features: ["Error detection", "Solution suggestions", "Code optimization"],
  },
  {
    id: "diet",
    name: "AI Diet Plan",
    description: "Create balanced meal plans based on your dietary preferences and goals.",
    icon: <Apple size={32} />,
    color: "#f59e0b",
    features: ["Meal planning", "Calorie tracking", "Recipe suggestions"],
  },
  {
    id: "movies",
    name: "AI Movie Recommendation",
    description: "Discover your next favorite movie with personalized recommendations.",
    icon: <Film size={32} />,
    color: "#8b5cf6",
    features: ["Personalized picks", "Genre filtering", "Rating predictions"],
  },
  {
    id: "aitherapist",
    name: "AI Therapist",
    description: "Get mental health support and guidance through AI-powered conversations.",
    icon: <Heart size={32} />,
    color: "#ec4899",
    features: ["24/7 support", "Mood tracking", "Coping strategies"],
  },
  {
    id: "resume",
    name: "AI Resume Checker",
    description: "Optimize your resume with AI-powered analysis and improvement suggestions.",
    icon: <FileText size={32} />,
    color: "#06b6d4",
    features: ["ATS optimization", "Skill matching", "Format suggestions"],
  },
  {
    id: "presentations",
    name: "AI Presentations",
    description: "Create stunning presentations with AI-generated content and designs.",
    icon: <Presentation size={32} />,
    color: "#f97316",
    features: ["Auto-generation", "Design templates", "Content suggestions"],
  },
]

const AIToolsShowcase = () => {
  const [selectedTool, setSelectedTool] = useState(null)
  const navigate = useNavigate();

  const handleToolStart = (toolId) => {
    navigate(`/${toolId}`);
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId)

    console.log(`Navigating to ${toolId} tool`)
  }

  return (
    <section id="tools" className={styles.showcase}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Choose Your <span className={styles.gradient}>AI Tool</span>
          </h2>
          <p className={styles.subtitle}>
            Select from our comprehensive suite of AI-powered tools designed to enhance your productivity
          </p>
        </div>

        <div className={styles.toolsGrid}>
          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className={`${styles.toolCard} ${selectedTool === tool.id ? styles.selected : ""}`}
              onClick={() => handleToolSelect(tool.id)}
              style={{ "--tool-color": tool.color } }
            >
              <div className={styles.toolIcon}>{tool.icon}</div>

              <h3 className={styles.toolName}>{tool.name}</h3>
              <p className={styles.toolDescription}>{tool.description}</p>

              <ul className={styles.toolFeatures}>
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <button className={styles.toolButton} onClick={()=>{handleToolStart(tool.id)}}>
                Start Using
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AIToolsShowcase
