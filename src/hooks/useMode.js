import { useState, useEffect } from 'react'

export const useMode = () => {
  const [currentMode, setCurrentMode] = useState('current')

  const availableModes = [
    { id: 'current', name: 'Current', description: 'Current functionality. Both panels scroll together.' },
    { id: 'inner-frame', name: 'Inner Frame', description: 'An "inner frame" within the left column scrolls. A sticky position, vh-based height, and negative margins are used to fake a standard scrollable content panel. additional logic is needed to stop scroll propagation to the outer container when you scroll this inner frame.' },
    { id: 'method-1', name: 'Method 1', description: 'A parent container holding the two panels is allowed to horizontally scroll. the two panels are each allowed to scroll vertically.' },
    { id: 'method-2', name: 'Method 2', description: 'Like method 1, but more advanced logic is used to sticky the scrollbars. This avoids hidden/out-of-view scrollbars, but increases complexity managing scrollbar swapping and right padding dynamic adjustments (when the panel scrollbar is swapped for the sticky scrollbar, we must adjust the panel right padding to prevent content shifting). ' },
    { id: 'accordions', name: 'Accordions', description: 'Accordions sort of work, but it forces the students to hopefully make the layout better for themselves, and means changing how the sim tool and content displays somewhat significantly. Are we adding accordion support to set leaders? moving all set leader content to the sim tool?' },
    { id: 'tabs', name: 'Tabs', description: 'The issue with tabs is how we sticky them to the top of the left panel, when the scrollable area is not the left panel (it\'s a higher container wrapping both panels using current DI scroll capability). If we use fancy logic like the Inner Frame method to stabalize the tabbed left panel, we might as well ditch tabs and just go with the Inner Frame method. Not stickying the tabs makes the ux worse, especially at zoom. Additionally, how are we authoring set leader text/img content (sub tabs in IBIS? all set leader content in the sim tool?).' }

  ]

  // Apply mode class to body
  useEffect(() => {
    // Remove all method classes
    document.body.classList.remove('current', 'inner-frame', 'method-1', 'method-2', 'accordions', 'tabs', 'isometric-center', 'viewport-zoom', 'iframe-panels', 'unified-scroll')
    
    // Add current mode class
    document.body.classList.add(currentMode)
    
    console.log(`Switched to mode: ${currentMode}`)
  }, [currentMode])

  const setMode = (modeId) => {
    if (availableModes.find(mode => mode.id === modeId)) {
      setCurrentMode(modeId)
    }
  }

  return {
    currentMode,
    setMode,
    availableModes
  }
}
