import React, { useState } from 'react'

const Accordion = ({ title, children, isOpen = false, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen)

  const handleToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }

  return (
    <div className="accordion">
      <button 
        className="accordion-header"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="accordion-title">{title}</span>
        <span className={`accordion-icon ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </button>
      
      <div 
        className={`accordion-content ${isExpanded ? 'expanded' : ''}`}
        id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-hidden={!isExpanded}
      >
        <div className="accordion-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Accordion
