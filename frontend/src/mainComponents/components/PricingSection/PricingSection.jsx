"use client"

import { useState } from "react"
import { Check, Star } from "lucide-react"
import styles from "./PricingSection.module.css"


const PricingSection = () => {
  function buyButton (){
    window.alert("We currently do not have a payment getaway available, you can continue to use our services for free during this period")
  }
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "$9" : "$12",
      period: isAnnual ? "/month (billed annually)" : "/month",
      description: "Perfect for individuals getting started with AI tools",
      features: ["Access to 3 AI tools", "100 requests per month", "Basic support", "Standard processing speed"],
      buttonText: "Start Free Trial",
    },
    {
      name: "Professional",
      price: isAnnual ? "$29" : "$39",
      period: isAnnual ? "/month (billed annually)" : "/month",
      description: "Ideal for professionals and small teams",
      features: [
        "Access to all 8 AI tools",
        "1,000 requests per month",
        "Priority support",
        "Fast processing speed",
        "Advanced analytics",
        "Custom integrations",
      ],
      popular: true,
      buttonText: "Get Started",
    },
    {
      name: "Enterprise",
      price: isAnnual ? "$99" : "$129",
      period: isAnnual ? "/month (billed annually)" : "/month",
      description: "For large teams and organizations",
      features: [
        "Access to all 8 AI tools",
        "Unlimited requests",
        "24/7 dedicated support",
        "Fastest processing speed",
        "Advanced analytics & reporting",
        "Custom integrations",
        "White-label options",
        "API access",
      ],
      buttonText: "Contact Sales",
    },
  ]

  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Simple, <span className={styles.gradient}>Transparent Pricing</span>
          </h2>
          <p className={styles.subtitle}>
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>

          <div className={styles.toggle}>
            <span className={!isAnnual ? styles.active : ""}>Monthly</span>
            <button className={styles.toggleButton} onClick={() => setIsAnnual(!isAnnual)}>
              <div className={`${styles.toggleSlider} ${isAnnual ? styles.toggleSliderActive : ""}`}></div>
            </button>
            <span className={isAnnual ? styles.active : ""}>
              Annual
              <span className={styles.discount}>Save 25%</span>
            </span>
          </div>
        </div>

        <div className={styles.plansGrid}>
          {plans.map((plan, index) => (
            <div key={index} className={`${styles.planCard} ${plan.popular ? styles.popular : ""}`}>
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <Star size={16} />
                  Most Popular
                </div>
              )}

              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>

              <ul className={styles.planFeatures}>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button onClick={buyButton} className={`${styles.planButton} ${plan.popular ? styles.popularButton : ""}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.guarantee}>
          <p>
            <strong>30-day money-back guarantee.</strong> No questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
