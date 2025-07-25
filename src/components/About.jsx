import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-center text-gradient">About Me</h2>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate software developer with a strong foundation in modern web technologies. 
                My journey in tech began with curiosity and has evolved into a dedicated pursuit of creating 
                innovative digital solutions.
              </p>
              
              <p>
                With expertise in full-stack development, I enjoy working on projects that challenge me 
                to think creatively and solve complex problems. I'm always eager to learn new technologies 
                and contribute to meaningful projects.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge with the developer community.
              </p>
            </div>
            
            <div className="about-stats">
              <div className="stat-item">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Technologies Mastered</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
