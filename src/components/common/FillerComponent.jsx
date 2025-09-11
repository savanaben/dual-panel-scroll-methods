import React from 'react'
import FillerTopSection from './FillerTopSection'
import FillerBottomSection from './FillerBottomSection'

const FillerComponent = ({ mode, section }) => {
  // If in accordions mode and a specific section is requested
  if (mode === 'accordions' && section) {
    if (section === 'top') {
      return (
        <div className="filler-container">
          <FillerTopSection />
        </div>
      )
    }
    
    if (section === 'bottom') {
      return (
        <div className="filler-container">
          <FillerBottomSection />
        </div>
      )
    }
  }

  // Default behavior - show full component
  return (
    <div className="filler-container">
      <FillerTopSection />
      <FillerBottomSection />
    </div>
  )
}

export default FillerComponent
