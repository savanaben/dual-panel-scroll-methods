import { useState, useEffect, useRef } from 'react'
import { useZoom } from './hooks/useZoom'
import { useMode } from './hooks/useMode'
import TopToolbar from './components/common/TopToolbar'
import DualPanelLayout from './components/variants/panels/DualPanelLayout'
import './App.css'

function App() {
  const { zoom, zoomIn, zoomOut, resetZoom, setZoom, effectiveZoom } = useZoom()
  const { currentMode, setMode, availableModes } = useMode()
  const outerContainerRef = useRef(null)

  return (
    <div className="app">
      <TopToolbar 
        zoom={zoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetZoom={resetZoom}
        effectiveZoom={effectiveZoom}
        currentMode={currentMode}
        setMode={setMode}
        availableModes={availableModes}
      />
      
      <div className="outer-container" ref={outerContainerRef}>
        <DualPanelLayout 
          zoom={zoom}
          effectiveZoom={effectiveZoom}
          mode={currentMode}
          outerContainerRef={outerContainerRef}
        />
      </div>
    </div>
  )
}

export default App