import React from 'react'
// We need Link to navigate to the Register page
import { Link } from 'react-router-dom' 
// Import our new CSS Module
import styles from './Login.module.css' 

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    console.log('Login submit:', data)
    // TODO: call API / perform auth
  }

  return (
    // Use the .loginPage class to center everything
    <div className={styles.loginPage}>
      {/* This is the white (or dark) card that holds the form */}
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome Back!</h2>
        
        <form onSubmit={handleSubmit}>
          
          <div className={styles.inputGroup}>
            {/* Labels are crucial for accessibility and a pro look */}
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.buttonContainer}>
            {/* We apply TWO classes:
              1. "primary" (from index.css) to get the main color
              2. styles.loginButton (from Login.module.css) to make it full-width
            */}
            <button type="submit" className={`primary ${styles.loginButton}`}>
              Login
            </button>
          </div>
        </form>

        <div className={styles.extraLink}>
          Don't have an account?{' '}
          <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  )
}
