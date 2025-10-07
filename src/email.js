import emailjs from '@emailjs/browser'
import { profile } from './data'

// Email validation helper
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize input helper
function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '')
}

// Rate limiting helper (simple client-side implementation)
const rateLimiter = {
  attempts: JSON.parse(localStorage.getItem('emailAttempts') || '[]'),
  
  canSendEmail() {
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    
    // Remove attempts older than 1 hour
    this.attempts = this.attempts.filter(timestamp => now - timestamp < oneHour)
    
    // Check if under limit (max 5 emails per hour)
    if (this.attempts.length >= 5) {
      return false
    }
    
    return true
  },
  
  recordAttempt() {
    this.attempts.push(Date.now())
    localStorage.setItem('emailAttempts', JSON.stringify(this.attempts))
  },
  
  getTimeUntilNextAllowed() {
    if (this.attempts.length === 0) return 0
    
    const oldestAttempt = Math.min(...this.attempts)
    const oneHour = 60 * 60 * 1000
    const timeElapsed = Date.now() - oldestAttempt
    return Math.max(0, oneHour - timeElapsed)
  }
}

// Enhanced email sending function with better error handling
export async function sendEmailViaEmailJS({ name, email, message }) {
  // Input validation
  if (!name || !email || !message) {
    throw new Error('All fields are required')
  }

  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters long')
  }

  if (message.length < 10) {
    throw new Error('Message must be at least 10 characters long')
  }

  // Rate limiting check
  if (!rateLimiter.canSendEmail()) {
    const timeLeft = rateLimiter.getTimeUntilNextAllowed()
    const minutes = Math.ceil(timeLeft / (60 * 1000))
    throw new Error(`Rate limit exceeded. Please try again in ${minutes} minutes.`)
  }

  // Environment variables check
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS configuration missing. Email functionality disabled.')
    throw new Error('Email service is currently unavailable. Please contact me directly at ' + profile.email)
  }

  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    message: sanitizeInput(message)
  }

  // Prepare email parameters
  const emailParams = {
    to_name: profile.name,
    to_email: profile.email,
    from_name: sanitizedData.name,
    from_email: sanitizedData.email,
    reply_to: sanitizedData.email,
    message: sanitizedData.message,
    timestamp: new Date().toLocaleString(),
    subject: `Portfolio Contact: Message from ${sanitizedData.name}`
  }

  try {
    // Record attempt for rate limiting
    rateLimiter.recordAttempt()
    
    console.log('Sending email with params:', { ...emailParams, message: '[REDACTED]' })
    
    const response = await emailjs.send(serviceId, templateId, emailParams, {
      publicKey,
      blockHeadless: true, // Prevent headless browser abuse
      limitRate: {
        id: 'portfolio_contact',
        throttle: 10000, // 10 seconds between attempts
      }
    })

    console.log('EmailJS response:', response)

    // Check for successful response
    if (response?.status === 200 || response?.text === 'OK') {
      return { 
        ok: true, 
        status: response?.status ?? 200, 
        text: response?.text ?? 'OK',
        message: 'Email sent successfully!'
      }
    } else {
      throw new Error('Email service returned an error')
    }
  } catch (error) {
    console.error('Email sending error:', error)

    // Enhanced error handling with specific error messages
    if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.')
    }

    if (error?.status === 429) {
      throw new Error('Too many requests. Please wait a moment before sending another message.')
    }

    if (error?.status === 400) {
      throw new Error('Invalid email format. Please check your email address and try again.')
    }

    if (error?.status >= 500) {
      throw new Error('Email service is temporarily unavailable. Please try again later or contact me directly.')
    }

    // Check if error might actually be success (some environments report errors for successful sends)
    const errorMessage = String(error?.message || '').toLowerCase()
    const errorText = String(error?.text || '').toLowerCase()
    const errorStatus = error?.status

    if (errorStatus === 200 || 
        errorMessage.includes('ok') || 
        errorText.includes('ok') || 
        errorText.includes('success')) {
      return { 
        ok: true, 
        status: errorStatus ?? 200, 
        text: errorText || 'OK',
        message: 'Email sent successfully!'
      }
    }

    // If we have a custom error message, use it
    if (error?.message && typeof error.message === 'string') {
      throw error
    }

    // Generic fallback error
    throw new Error('Failed to send email. Please try again or contact me directly at ' + profile.email)
  }
}

// Utility function to test EmailJS configuration
export async function testEmailJSConfiguration() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  return {
    configured: !!(serviceId && templateId && publicKey),
    serviceId: !!serviceId,
    templateId: !!templateId,
    publicKey: !!publicKey
  }
}

// Contact form validation helper
export function validateContactForm({ name, email, message }) {
  const errors = {}

  if (!name || name.trim().length === 0) {
    errors.name = 'Name is required'
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters'
  }

  if (!email || email.trim().length === 0) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Please enter a valid email address'
  }

  if (!message || message.trim().length === 0) {
    errors.message = 'Message is required'
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Auto-save draft functionality
export class ContactFormDraft {
  static key = 'contact_form_draft'

  static save({ name, email, message }) {
    const draft = {
      name: name || '',
      email: email || '',
      message: message || '',
      timestamp: Date.now()
    }
    localStorage.setItem(this.key, JSON.stringify(draft))
  }

  static load() {
    try {
      const stored = localStorage.getItem(this.key)
      if (!stored) return null

      const draft = JSON.parse(stored)
      const oneDay = 24 * 60 * 60 * 1000
      
      // Only return draft if it's less than 24 hours old
      if (Date.now() - draft.timestamp > oneDay) {
        this.clear()
        return null
      }

      return {
        name: draft.name || '',
        email: draft.email || '',
        message: draft.message || ''
      }
    } catch (error) {
      console.error('Error loading draft:', error)
      return null
    }
  }

  static clear() {
    localStorage.removeItem(this.key)
  }
}

// Email template suggestions
export const emailTemplates = {
  collaboration: {
    subject: 'Project Collaboration Opportunity',
    template: `Hi Ayush,

I came across your portfolio and I'm impressed with your work, especially [specific project]. 

I'd love to discuss a potential collaboration opportunity on [project/idea description].

Looking forward to hearing from you!

Best regards,
[Your name]`
  },
  
  hiring: {
    subject: 'Internship/Job Opportunity',
    template: `Hello Ayush,

We're reaching out regarding a [internship/position] opportunity at [company name]. 

Your background in [specific skills] aligns well with what we're looking for.

Would you be interested in discussing this further?

Best regards,
[Your name]
[Company/Title]`
  },
  
  networking: {
    subject: 'Professional Networking',
    template: `Hi Ayush,

I'm a fellow [student/developer] and would love to connect and potentially collaborate on projects.

Your work on [specific project] really caught my attention.

Would you be open to a brief chat?

Best regards,
[Your name]`
  }
}