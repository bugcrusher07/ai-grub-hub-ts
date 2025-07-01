import { Star, Quote } from "lucide-react"
import styles from "./TestimonialsSection.module.css"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "The AI tools have revolutionized our workflow. The code debugging tool alone has saved us countless hours.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "Fitness Coach",
    company: "FitLife Studio",
    content: "The AI fitness planner creates personalized workouts that my clients absolutely love. Game changer!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    company: "Creative Agency",
    content: "From email writing to presentations, these AI tools have made me incredibly more productive.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const TestimonialsSection = () => {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            What Our <span className={styles.gradient}>Users Say</span>
          </h2>
          <p className={styles.subtitle}>Join thousands of satisfied users who have transformed their productivity</p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>
                <Quote size={24} />
              </div>

              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className={styles.content}>"{testimonial.content}"</p>

              <div className={styles.author}>
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className={styles.avatar} />
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{testimonial.name}</span>
                  <span className={styles.role}>
                    {testimonial.role} at {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
