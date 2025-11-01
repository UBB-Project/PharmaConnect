import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Assuming you're using react-router
import styles from './Register.module.css'

export default function Register() {
  // 'user' or 'pharmacy'
  const [accountType, setAccountType] = useState('user')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data.accountType = accountType
    console.log('Register submit:', data)
    // TODO: call API / perform registration
  }

  // --- Sub-components for cleaner JSX ---

  const UserFormFields = () => (
    <div className={styles.formWrapper}>
      {/* Grid for First and Last Name */}
      <div className={styles.nameGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="firstName">First Name</label>
          <input className={styles.input} id="firstName" name="firstName" type="text" placeholder="Jane" required />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="surname">Surname</label>
          <input className={styles.input} id="surname" name="surname" type="text" placeholder="Doe" required />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input} id="email" name="email" type="email" placeholder="jane.doe@example.com" required />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} id="password" name="password" type="password" placeholder="••••••••" required />
      </div>
    </div>
  )

  const PharmacyFormFields = () => (
    <div className={styles.formWrapper}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="pharmacyName">Pharmacy Name</label>
        <input className={styles.input} id="pharmacyName" name="pharmacyName" type="text" placeholder="GreenCross Pharmacy" required />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="licenseNumber">License Number</label>
        <input className={styles.input} id="licenseNumber" name="licenseNumber" type="text" placeholder="PH-12345678" required />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="address">Address</label>
        <input className={styles.input} id="address" name="address" type="text" placeholder="123 Main St, Anytown" required />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input} id="email" name="email" type="email" placeholder="contact@greencross.com" required />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} id="password" name="password" type="password" placeholder="••••••••" required />
      </div>
    </div>
  )

  // --- Main Component Render ---

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Create Account</h1>

        {/* Animated Toggle */}
        <div className={styles.toggleContainer}>
          <div className={`${styles.toggleSlider} ${accountType === 'pharmacy' ? styles.active : ''}`} />
          <button
            type="button"
            className={`${styles.toggleButton} ${accountType === 'user' ? styles.active : ''}`}
            onClick={() => setAccountType('user')}
          >
            User
          </button>
          <button
            type="button"
            className={`${styles.toggleButton} ${accountType === 'pharmacy' ? styles.active : ''}`}
            onClick={() => setAccountType('pharmacy')}
          >
            Pharmacy
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Conditional Form Rendering */}
          {accountType === 'user' ? <UserFormFields /> : <PharmacyFormFields />}

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.registerButton}>
              Create Account
            </button>
          </div>
        </form>

        <div className={styles.extraLink}>
          <span>Already have an account? </span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  )
}
