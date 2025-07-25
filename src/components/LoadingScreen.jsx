import React from 'react'
import { motion } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = () => {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <motion.div 
          className="loading-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="loading-text">SC</span>
          <div className="loading-ring"></div>
        </motion.div>
        
        <motion.div 
          className="loading-progress"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, delay: 0.5 }}
        >
          <div className="loading-bar"></div>
        </motion.div>
        
        <motion.p 
          className="loading-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Initializing Elite Experience...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
