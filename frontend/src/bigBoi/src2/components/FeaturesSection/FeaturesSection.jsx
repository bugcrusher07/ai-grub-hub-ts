import { Zap, Shield, Globe, Smartphone, BarChart3, Headphones } from "lucide-react"
import styles from "./FeaturesSection.module.css"

const features = [
  {
    icon: <Zap size={32} />,
    title: "Lightning Fast",
    description: "Get results in seconds with our optimized AI processing pipeline.",
  },
  {
    icon: <Shield size={32} />,
    title: "Secure & Private",
    description: "Your data is encrypted and never stored. Complete privacy guaranteed.",
  },
  {
    icon: <Globe size={32} />,
    title: "Global Access",
    description: "Access your AI tools from anywhere in the world, 24/7.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Optimized",
    description: "Perfect experience across all devices - desktop, tablet, and mobile.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Advanced Analytics",
    description: "Track your usage and productivity with detailed insights and reports.",
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated support team.",
  },
]

const FeaturesSection= () => {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Why Choose <span className={styles.gradient}>Our Platform</span>
          </h2>
          <p className={styles.subtitle}>Built with cutting-edge technology to provide the best AI experience</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
