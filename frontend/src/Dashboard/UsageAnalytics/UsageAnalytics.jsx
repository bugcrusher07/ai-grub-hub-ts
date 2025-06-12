"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from "./UsageAnalytics.module.css"

const UsageAnalytics = () => {
  const [activeTab, setActiveTab] = useState("Daily")

  const data = [
    { name: "Mon", Chatbot: 38, "Image Gen": 24, "Text Gen": 18 },
    { name: "Tue", Chatbot: 30, "Image Gen": 28, "Text Gen": 22 },
    { name: "Wed", Chatbot: 45, "Image Gen": 31, "Text Gen": 15 },
    { name: "Thu", Chatbot: 48, "Image Gen": 25, "Text Gen": 25 },
    { name: "Fri", Chatbot: 34, "Image Gen": 30, "Text Gen": 20 },
    { name: "Sat", Chatbot: 25, "Image Gen": 18, "Text Gen": 13 },
    { name: "Sun", Chatbot: 30, "Image Gen": 20, "Text Gen": 15 },
  ]

  const tabs = ["Daily", "Monthly", "Trends"]

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>AI Tools Usage Analytics</h2>
          <p className={styles.subtitle}>Track your AI tools usage and trends</p>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Chatbot" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Image Gen" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Text Gen" fill="#ffc658" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default UsageAnalytics
