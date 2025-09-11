import { useEffect, useRef } from 'react'

export const useInnerFrameScroll = (mode) => {
  const leftColumnRef = useRef(null)

  useEffect(() => {
    if (mode !== 'inner-frame') return

    const leftColumn = leftColumnRef.current
    const scrollableInnerFrame = leftColumn?.querySelector('.scrollable-inner-frame')
    
    if (!leftColumn || !scrollableInnerFrame) return

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableInnerFrame
      
      // Check if we're at the top or bottom of the inner frame
      const isAtTop = scrollTop === 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight
      
      // If scrolling up and at top, or scrolling down and at bottom, prevent bubbling
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.stopPropagation()
        e.preventDefault()
      }
    }

    // Add wheel event listener to the scrollable inner frame
    scrollableInnerFrame.addEventListener('wheel', handleWheel, { passive: false })

    // Cleanup
    return () => {
      scrollableInnerFrame.removeEventListener('wheel', handleWheel)
    }
  }, [mode])

  return { leftColumnRef }
}
