import React from 'react'

const TopToolbar = ({ 
  zoom, 
  zoomIn, 
  zoomOut, 
  resetZoom, 
  effectiveZoom, 
  currentMode, 
  setMode, 
  availableModes 
}) => {
  // Get the current mode's description for the explainer text
  const currentModeInfo = availableModes.find(mode => mode.id === currentMode)
  const explainerText = currentModeInfo ? currentModeInfo.description : ''

  return (
    <div className="top-toolbar">
      <div className="toolbar-content">
        {/* Left side - Controls (30%) */}
        <div className="controls-section">
          {/* Zoom Controls */}
          <div className="zoom-controls">
            <button 
              onClick={zoomOut}
              disabled={zoom <= 100}
              className="zoom-btn"
            >
              Zoom Out
            </button>
            
            <button 
              onClick={zoomIn}
              disabled={zoom >= 200}
              className="zoom-btn"
            >
              Zoom In
            </button>
            
            <button 
              onClick={resetZoom}
              className="zoom-btn"
            >
              Reset
            </button>
            
            <div className="zoom-level">
              <div>Manual: {zoom}%</div>
              <div>Effective: {Math.round(effectiveZoom)}%</div>
            </div>
          </div>

          {/* Mode Selector - moved to bottom right */}
          <div className="mode-selector">
            <label htmlFor="mode-select">Layout Mode:</label>
            <select 
              id="mode-select"
              value={currentMode} 
              onChange={(e) => setMode(e.target.value)}
              className="mode-dropdown"
            >
              {availableModes.map(mode => (
                <option key={mode.id} value={mode.id}>
                  {mode.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side - Explainer Text (70%) */}
        <div className="explainer-section">
          <div className="explainer-text">
            {explainerText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopToolbar
