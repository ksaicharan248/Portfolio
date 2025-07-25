import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a')
    link.href = '/api/download'
    link.download = 'Sai_Charan_K_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <motion.div 
            className="hero-greeting"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          <motion.h1 
            className="hero-name"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="name-highlight">Sai Charan K</span>
          </motion.h1>

          <motion.div 
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="title-text">Software Developer</span>
            <span className="title-accent"> & Tech Enthusiast</span>
          </motion.div>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Crafting innovative digital solutions with cutting-edge technologies. 
            Passionate about creating exceptional user experiences and pushing the boundaries of what's possible.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <button className="btn btn-primary" onClick={handleDownloadResume}>
              <Download size={20} />
              Download Resume
            </button>
            <button className="btn btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              <Mail size={20} />
              Let's Connect
            </button>
          </motion.div>

          <motion.div 
            className="hero-social"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a href="https://github.com/ksaicharan248" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/sai-charan-k-21940924a" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={24} />
            </a>
            <a href="mailto:saicharanreddy141458@gmail.com" className="social-link">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="hero-avatar">
            <div className="avatar-ring"></div>
            <div className="avatar-content">
              <span className="avatar-text">SC</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button 
        className="scroll-indicator"
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  )
}

export default Hero
