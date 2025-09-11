import { useState, useEffect, useCallback } from 'react'

export const useZoom = () => {
  const [currentZoom, setCurrentZoom] = useState(100)
  const [heightMethod, setHeightMethod] = useState(1) // 1 = Method 1, 2 = Method 2
  
  const minZoom = 100
  const maxZoom = 200
  const zoomStep = 25
  const baseWidth = 1366

  // Calculate responsive zoom factor based on viewport width
  const calculateResponsiveZoomFactor = useCallback(() => {
    const viewportWidth = window.innerWidth
    const responsiveZoomFactor = viewportWidth / baseWidth
    
    // Don't go below a minimum scale to maintain readability
    const minResponsiveZoom = 0.5
    const maxResponsiveZoom = 3.0
    
    return Math.max(minResponsiveZoom, Math.min(maxResponsiveZoom, responsiveZoomFactor))
  }, [])

  // Calculate effective zoom (responsive + manual)
  const effectiveZoom = useCallback(() => {
    const responsiveZoomFactor = calculateResponsiveZoomFactor()
    const manualZoomFactor = currentZoom / 100
    return responsiveZoomFactor * manualZoomFactor * 100
  }, [currentZoom, calculateResponsiveZoomFactor])

  // Apply zoom using CSS variables
  const applyZoom = useCallback(() => {
    const responsiveZoomFactor = calculateResponsiveZoomFactor()
    const manualZoomFactor = currentZoom / 100
    const finalZoomFactor = responsiveZoomFactor * manualZoomFactor
    
    // Update CSS variable for zoom factor
    document.documentElement.style.setProperty('--zoom-factor', finalZoomFactor)
    
    // Update heights based on method
    updateHeights(finalZoomFactor)
    
    console.log(`Method ${heightMethod}: CSS Variables --zoom-factor: ${finalZoomFactor.toFixed(2)}`)
  }, [currentZoom, heightMethod, calculateResponsiveZoomFactor])

  // Update container heights
  const updateHeights = useCallback((zoomFactor) => {
    const container = document.querySelector('.content-container')
    if (!container) return

    // Both methods now use the same dynamic vh calculation approach
    const viewportHeight = window.innerHeight
    const toolbarHeight = 120
    const scrollbarHeight = currentZoom > 100 ? 18 : 0
    const availableHeight = viewportHeight - toolbarHeight - scrollbarHeight
    
    const heightPercentage = (availableHeight / viewportHeight) * 100
    container.style.height = `${heightPercentage}vh`
    
    if (heightMethod === 1) {
      // Method 1: Reset column heights to use flexbox
      const columns = document.querySelectorAll('.column')
      columns.forEach(column => {
        column.style.height = ''
      })
    } else {
      // Method 2: Update individual columns to use the same height
      const columns = document.querySelectorAll('.column')
      columns.forEach(column => {
        column.style.height = `${heightPercentage}vh`
      })
    }
  }, [heightMethod, currentZoom])

  // Zoom controls
  const zoomIn = useCallback(() => {
    if (currentZoom < maxZoom) {
      setCurrentZoom(prev => prev + zoomStep)
    }
  }, [currentZoom, maxZoom, zoomStep])

  const zoomOut = useCallback(() => {
    if (currentZoom > minZoom) {
      setCurrentZoom(prev => prev - zoomStep)
    }
  }, [currentZoom, minZoom, zoomStep])

  const resetZoom = useCallback(() => {
    setCurrentZoom(100)
  }, [])

  const setZoom = useCallback((zoomLevel) => {
    setCurrentZoom(Math.max(minZoom, Math.min(maxZoom, zoomLevel)))
  }, [minZoom, maxZoom])

  const toggleMethod = useCallback(() => {
    setHeightMethod(prev => prev === 1 ? 2 : 1)
  }, [])

  // Detect current mode and adjust height method
  useEffect(() => {
    const body = document.body
    const isMethod2 = body.classList.contains('method-2')
    setHeightMethod(isMethod2 ? 2 : 1)
  }, [])

  // Listen for class changes on body to detect mode switches
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const body = document.body
          const isMethod2 = body.classList.contains('method-2')
          setHeightMethod(isMethod2 ? 2 : 1)
        }
      })
    })
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Apply zoom when currentZoom or heightMethod changes
  useEffect(() => {
    applyZoom()
  }, [applyZoom])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      applyZoom()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [applyZoom])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case '=':
          case '+':
            e.preventDefault()
            zoomIn()
            break
          case '-':
            e.preventDefault()
            zoomOut()
            break
          case '0':
            e.preventDefault()
            resetZoom()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [zoomIn, zoomOut, resetZoom])

  return {
    zoom: currentZoom,
    effectiveZoom: effectiveZoom(),
    heightMethod,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    toggleMethod,
    canZoomIn: currentZoom < maxZoom,
    canZoomOut: currentZoom > minZoom
  }
}
