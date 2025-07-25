import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import ParticleBackground from './components/ParticleBackground'
import CursorFollower from './components/CursorFollower'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

// Styles
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <div className="App">
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <ParticleBackground />
            <CursorFollower />
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
            
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </main>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
