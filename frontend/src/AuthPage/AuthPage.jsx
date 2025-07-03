"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome, ArrowRight, Shield } from "lucide-react"
import styles from "./AuthPage.module.css"

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (isSignUp && !formData.username) {
      newErrors.username = "Username is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    console.log("Authentication successful", formData)
  }

  const handleSocialLogin = async (provider) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    console.log(`${provider} login initiated`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.backgroundPattern}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.authCard}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Shield className={styles.logoIcon} />
            </div>
            <h1 className={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
            <p className={styles.subtitle}>
              {isSignUp ? "Join thousands of users who trust our platform" : "Sign in to your account to continue"}
            </p>
          </div>

          <div className={styles.socialButtons}>
            <button className={styles.socialButton} onClick={() => handleSocialLogin("Google")} disabled={isLoading}>
              <Chrome size={20} />
              Continue with Google
            </button>
            <button className={styles.socialButton} onClick={() => handleSocialLogin("GitHub")} disabled={isLoading}>
              <Github size={20} />
              Continue with GitHub
            </button>
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {isSignUp && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <User size={16} />
                  Username
                </label>
                <input
                  type="text"
                  className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                />
                {errors.username && <span className={styles.errorText}>{errors.username}</span>}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Lock size={16} />
                Password
              </label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            {isSignUp && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Lock size={16} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                />
                {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
              </div>
            )}

            <div className={styles.formOptions}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                <p style={{color:'white'}}>{isSignUp ? "I agree to the Terms of Service" : "Remember me"}</p>
              </label>

              {!isSignUp && (
                <a href="#" className={styles.forgotPassword}>
                  Forgot password?
                </a>
              )}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </div>
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button className={styles.switchMode} onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and protected with industry-standard security</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Lightning Fast</h3>
            <p>Experience blazing fast performance with our optimized platform</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🌟</div>
            <h3>Premium Features</h3>
            <p>Access advanced AI tools and premium features with your account</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
