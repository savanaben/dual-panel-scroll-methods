import React from 'react'

const FillerTopSection = () => {
  return (
    <div className="filler-top-section">
      {/* Left side - 40% */}
      <div className="filler-left-panel">
        <div className="filler-form-group">
          <label className="filler-label">Category:</label>
          <select className="filler-dropdown">
            <option>Mathematics</option>
            <option>Science</option>
            <option>Reading</option>
          </select>
        </div>
        
        <div className="filler-form-group">
          <label className="filler-label">Grade Level:</label>
          <select className="filler-dropdown">
            <option>Grade 4</option>
            <option>Grade 8</option>
            <option>Grade 12</option>
          </select>
        </div>
        
        <div className="filler-form-group">
          <label className="filler-label">Subject:</label>
          <select className="filler-dropdown">
            <option>Algebra</option>
            <option>Geometry</option>
            <option>Statistics</option>
          </select>
        </div>
      </div>
      
      {/* Right side - 60% */}
      <div className="filler-right-panel">
        <div className="filler-image-placeholder">
          <span className="filler-placeholder-text">Placeholder</span>
        </div>
      </div>
    </div>
  )
}

export default FillerTopSection
