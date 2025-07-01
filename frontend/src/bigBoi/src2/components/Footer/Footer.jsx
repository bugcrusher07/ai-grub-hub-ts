import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"
import styles from "./Footer.module.css"

const Footer= () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>AI Tools Hub</h3>
            <p className={styles.brandDescription}>
              Empowering productivity with cutting-edge AI technology. Transform your workflow with our comprehensive
              suite of AI tools.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>AI Tools</h4>
              <ul>
                <li>
                  <a href="#fitness">AI Fitness Plan</a>
                </li>
                <li>
                  <a href="#email">AI Email Letter</a>
                </li>
                <li>
                  <a href="#debugging">Code Debugging</a>
                </li>
                <li>
                  <a href="#diet">AI Diet Plan</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>More Tools</h4>
              <ul>
                <li>
                  <a href="#movies">Movie Recommendations</a>
                </li>
                <li>
                  <a href="#therapist">AI Therapist</a>
                </li>
                <li>
                  <a href="#resume">Resume Checker</a>
                </li>
                <li>
                  <a href="#presentations">AI Presentations</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#help">Help Center</a>
                </li>
                <li>
                  <a href="#contact">Contact Us</a>
                </li>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.contact}>
            <h4>Get in Touch</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>hello@aitoolshub.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className={styles.newsletter}>
              <h5>Stay Updated</h5>
              <div className={styles.newsletterForm}>
                <input type="email" placeholder="Enter your email" className={styles.emailInput} />
                <button className={styles.subscribeButton}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2024 AI Tools Hub. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
