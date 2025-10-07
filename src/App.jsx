import { useEffect, useState, useRef } from 'react'
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { FiMoon, FiSun, FiGithub, FiLinkedin, FiMail, FiDownload, FiExternalLink, FiCode, FiEye, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import cn from 'classnames'
import './App.css'
import { profile, education, experience, certifications, skills as skillsData, projects as projectsData } from './data'
import { sendEmailViaEmailJS } from './email'

const Motion = motion

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: profile.github, element: <FiGithub />, label: 'GitHub' },
  { href: profile.linkedin, element: <FiLinkedin />, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, element: <FiMail />, label: 'Email' },
]

// Enhanced particle system for background
function ParticleBackground() {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="particle-background">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [`${particle.y}vh`, `${particle.y - 100}vh`],
          }}
          transition={{
            duration: particle.speed * 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  )
}

// Enhanced theme hook with system preference detection
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}

// Enhanced layout with better navigation
function Layout({ children }) {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cn('app-container', theme)}>
      <ParticleBackground />
      <motion.header 
        className={cn('site-header', { scrolled: isScrolled })}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="navbar">
          <motion.div 
            className="brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AYUSH KHOPATKAR
          </motion.div>
          <ul className="nav-links">
            {navItems.map(({ path, label }, index) => (
              <motion.li 
                key={path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink 
                  to={path} 
                  className={({ isActive }) => cn('nav-link', { active: isActive })} 
                  end={path === '/'}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {label}
                  </motion.span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
          <motion.button 
            aria-label="Toggle theme" 
            className="icon-btn theme-toggle" 
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>
      
      <main className="site-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <motion.footer 
        className="site-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="socials">
          {socialLinks.map(({ href, element, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="icon-link"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {element}
            </motion.a>
          ))}
        </div>
        <div className="copyright">© {new Date().getFullYear()} Ayush Khopatkar. All rights reserved.</div>
      </motion.footer>
    </div>
  )
}

// Enhanced typing animation component
function TypewriterText({ text, speed = 50 }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return <span>{displayText}<span className="cursor">|</span></span>
}

// Enhanced home component with better animations
function Home() {
  const navigate = useNavigate()
  const ref = useInView({ threshold: 0.1 })

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="home"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-content"
      >
        <motion.div
          className="greeting"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          👋 Hello, I'm
        </motion.div>
        
        <h1 className="title">
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {profile.name}
          </motion.span>
        </h1>
        
        <motion.div 
          className="subtitle-container"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="subtitle">
            <TypewriterText text={profile.tagline} speed={80} />
          </p>
        </motion.div>
        
        <motion.p 
          className="summary"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {profile.summary}
        </motion.p>
        
        <motion.div 
          className="cta"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button 
            className="btn primary" 
            onClick={() => navigate('/projects')}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(124,140,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEye /> View Projects
          </motion.button>
          <motion.button 
            className="btn secondary" 
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMail /> Contact Me
          </motion.button>
          <motion.a 
            className="btn outline" 
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload /> Resume
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="hero-visual"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
      >
        <div className="floating-elements">
          {['💻', '⚡', '🚀', '✨'].map((emoji, i) => (
            <motion.div
              key={i}
              className={`floating-element element-${i}`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

// Enhanced about component with better animations
function About() {
  const [tab, setTab] = useState('education')
  const tabs = [
    { id: 'education', label: 'Education', icon: <FiAward /> },
    { id: 'experience', label: 'Experience', icon: <FiCalendar /> },
    { id: 'certifications', label: 'Certifications', icon: <FiAward /> }
  ]

  const renderContent = () => {
    const content = {
      education: education.map((e, i) => (
        <motion.li 
          key={e.title} 
          className="timeline-item"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="timeline-marker" />
          <div className="timeline-content">
            <h4>{e.title}</h4>
            <p>{e.detail}</p>
          </div>
        </motion.li>
      )),
      experience: experience.map((ex, i) => (
        <motion.li 
          key={ex.company} 
          className="timeline-item"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="timeline-marker" />
          <div className="timeline-content">
            <h4>{ex.company} — {ex.role}</h4>
            <p className="period"><FiMapPin size={14} /> {ex.period}</p>
            <ul className="experience-points">
              {ex.points.map((p, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i * 0.1) + (idx * 0.05) + 0.2 }}
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.li>
      )),
      certifications: certifications.map((c, i) => (
        <motion.li 
          key={c.name} 
          className="timeline-item"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="timeline-marker" />
          <div className="timeline-content">
            <h4>{c.name}</h4>
            <p>{c.provider} • {c.year}</p>
           
            {c.skills && <p>Skills: {c.skills.join(', ')}</p>}
          </div>
        </motion.li>
      ))
    }
    return content[tab] || []
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="about"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
      
      <motion.div 
        className="tabs-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="tabs" role="tablist" aria-label="About tabs">
          {tabs.map((tabItem, index) => (
            <motion.button
              key={tabItem.id}
              role="tab"
              aria-selected={tab === tabItem.id}
              className={cn('tab', { active: tab === tabItem.id })}
              onClick={() => setTab(tabItem.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {tabItem.icon}
              {tabItem.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="timeline">
            {renderContent()}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}

// Enhanced skills component with animated bars
function Skills() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [])

  const groupedSkills = {
    'Programming Languages': skillsData.filter(s => ['Java', 'C#', 'Python', 'JavaScript'].includes(s.name)),
    'Frontend Technologies': skillsData.filter(s => ['HTML/CSS', 'React', 'Bootstrap', 'Tailwind CSS'].includes(s.name)),
    'Backend & Database': skillsData.filter(s => ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'REST APIs'].includes(s.name)),
    'Tools & Others': skillsData.filter(s => ['Git & GitHub', 'OOP', 'DBMS'].includes(s.name))
  }

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="skills"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Technical Skills
      </motion.h2>
      
      <div className="skills-grid">
        {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="category-title">{category}</h3>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-level"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: (categoryIndex * 0.1) + (index * 0.05) + 0.3 }}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Enhanced projects component with better cards
function Projects() {
  const [filter, setFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)
  
  const tags = ['All', ...Array.from(new Set(projectsData.flatMap((p) => p.tags)))]
  const filtered = filter === 'All' ? projectsData : projectsData.filter((p) => p.tags.includes(filter))

  return (
    <motion.section 
      id="projects" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="projects"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Featured Projects
      </motion.h2>
      
      <motion.div 
        className="filter-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {tags.map((t, index) => (
          <motion.button
            key={t}
            className={cn('filter-tab', { active: filter === t })}
            onClick={() => setFilter(t)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.3 }}
          >
            {t}
          </motion.button>
        ))}
      </motion.div>
      
      <AnimatePresence>
        <motion.div 
          className="project-grid"
          layout
        >
          {filtered.map((p, index) => (
            <motion.article
              key={p.title}
              className="project-card"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredProject(p.title)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className="project-header">
                <h3>{p.title}</h3>
                <motion.div
                  className="project-icon"
                  animate={{ rotate: hoveredProject === p.title ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  💼
                </motion.div>
              </div>
              
              <p className="project-description">{p.description}</p>
              
              <div className="tags">
                {p.tags.map((t, i) => (
                  <motion.span
                    key={t}
                    className="tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.02 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              
              {/* <div className="actions">
                {p.link && (
                  <motion.a
                    className="btn project-btn"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink /> Live Demo
                  </motion.a>
                )}
                {p.repo && (
                  <motion.a
                    className="btn project-btn"
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCode /> Source Code
                  </motion.a>
                )}
              </div> */}
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}

// Enhanced contact component with better form
function Contact() {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, message } = formData
    
    if (!name || !email || !message) {
      setStatus('Please fill in all fields.')
      return
    }

    try {
      setSending(true)
      setStatus('Sending your message...')
      
      const res = await sendEmailViaEmailJS({ name, email, message })
      console.log('EmailJS response:', res)
      
      if (res?.ok || String(res?.status).startsWith('2') || String(res?.text).toUpperCase().includes('OK')) {
        setStatus('✅ Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('❌ Failed to send message. Please try again or contact me directly.')
      }
    } catch (err) {
      console.error(err)
      const msg = String(err?.message || '').toUpperCase()
      const txt = String(err?.text || '').toUpperCase()
      const status = String(err?.status || '')
      
      if (status.startsWith('2') || msg.includes('OK') || txt.includes('OK')) {
        setStatus('✅ Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('❌ Failed to send message. Please try again or contact me directly.')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.section 
      id="contact" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="contact"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h2>
      
      <motion.div
        className="contact-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="contact-text">
          Let's connect! Whether you have a project idea, want to collaborate, or just want to say hello, 
          I'd love to hear from you.
        </p>
        
        <div className="contact-methods">
          <motion.a 
            href={`mailto:${profile.email}`} 
            className="contact-method"
            whileHover={{ scale: 1.05, x: 10 }}
          >
            <FiMail />
            <span>{profile.email}</span>
          </motion.a>
         
        </div>
      </motion.div>
      
      <motion.form 
        className="contact-form" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="form-row">
          <motion.div 
            className="input-group"
            whileFocus={{ scale: 1.02 }}
          >
            <input 
              name="name" 
              placeholder="Your name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
          </motion.div>
          <motion.div 
            className="input-group"
            whileFocus={{ scale: 1.02 }}
          >
            <input 
              name="email" 
              type="email" 
              placeholder="Your email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="input-group"
          whileFocus={{ scale: 1.02 }}
        >
          <textarea 
            name="message" 
            rows="5" 
            placeholder="Your message" 
            value={formData.message}
            onChange={handleInputChange}
            required 
          />
        </motion.div>
        
        <motion.button 
          className="btn primary submit-btn" 
          type="submit" 
          disabled={sending}
          whileHover={!sending ? { scale: 1.05 } : {}}
          whileTap={!sending ? { scale: 0.95 } : {}}
        >
          <AnimatePresence mode="wait">
            {sending ? (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="spinner" />
                Sending...
              </motion.div>
            ) : (
              <motion.div
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <FiMail />
                Send Message
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        <AnimatePresence>
          {status && (
            <motion.div 
              className={cn('status', {
                success: status.includes('✅'),
                error: status.includes('❌')
              })}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {status}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.section>
  )
}

// Enhanced scroll to top button
function ScrollTopButton() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.1)
    })
    return unsubscribe
  }, [scrollYProgress])

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1])

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.button
          className="scroll-top"
          style={{ scale, opacity }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </Motion.button>
      )}
    </AnimatePresence>
  )
}

// Loading screen component
function LoadingScreen({ onLoadingComplete }) {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 2000)
    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="loading-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="loading-logo"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          ⚡
        </motion.div>
        <h2>AYUSH KHOPATKAR</h2>
        <p>Loading portfolio...</p>
      </motion.div>
    </motion.div>
  )
}

// Main App component with loading screen
export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" onLoadingComplete={() => setLoading(false)} />
      ) : (
        <Layout key="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <ScrollTopButton />
        </Layout>
      )}
    </AnimatePresence>
  )
}