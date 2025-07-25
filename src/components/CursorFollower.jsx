import React, { useEffect } from 'react'

const CursorFollower = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor-follower')
    const cursorDelayed = document.querySelector('.cursor-follower-delayed')
    
    if (!cursor || !cursorDelayed) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let cursorDelayedX = 0
    let cursorDelayedY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animateCursor = () => {
      // Main cursor follows immediately
      cursorX = mouseX
      cursorY = mouseY
      
      // Delayed cursor follows with lerp
      cursorDelayedX += (mouseX - cursorDelayedX) * 0.1
      cursorDelayedY += (mouseY - cursorDelayedY) * 0.1

      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
      cursorDelayed.style.transform = `translate(${cursorDelayedX - 20}px, ${cursorDelayedY - 20}px)`

      requestAnimationFrame(animateCursor)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div className="cursor-follower"></div>
      <div className="cursor-follower-delayed"></div>
    </>
  )
}

export default CursorFollower
