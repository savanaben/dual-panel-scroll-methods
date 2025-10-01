import React, { useState, useEffect, useRef, useCallback } from 'react'

const MoreTopButton = ({ containerRef, zoom, useDirectContainer = false }) => {
  const [showMore, setShowMore] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const isTopButtonActive = useRef(false)
  const completedTopAction = useRef(false)

  const getContainer = useCallback(() => {
    const root = containerRef?.current
    if (!root) return null

    if (useDirectContainer || root.classList?.contains('outer-container')) {
      return root
    }

    return root.querySelector('.column-content') || root
  }, [containerRef, useDirectContainer])

  const updateVisibility = useCallback(() => {
    const container = getContainer()
    if (!container) return

    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight

    let shouldShowMore = false
    let shouldShowTop = false

    if (scrollTop === 0) {
      if (isTopButtonActive.current) {
        isTopButtonActive.current = false
        completedTopAction.current = true
      } else if (!completedTopAction.current) {
        if (scrollHeight > clientHeight + 1) {
          shouldShowMore = true
        }
      }
    } else if (!completedTopAction.current) {
      if (clientHeight + scrollTop >= scrollHeight - 1) {
        isTopButtonActive.current = true
        shouldShowTop = true
      } else if (isTopButtonActive.current) {
        shouldShowTop = true
      } else {
        shouldShowMore = true
      }
    }

    setShowMore(shouldShowMore)
    setShowTop(shouldShowTop)
  }, [getContainer])

  // Reset button state when zoom changes
  useEffect(() => {
    // Reset the button state to initial state
    isTopButtonActive.current = false
    completedTopAction.current = false
    
    // Trigger visibility update after a short delay to allow DOM to settle
    const timeoutId = setTimeout(() => {
      updateVisibility()
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [zoom, updateVisibility])

  useEffect(() => {
    const container = getContainer()

    if (!container) return

    // Initial visibility check
    const initialTimeout = setTimeout(() => updateVisibility(), 100)

    const handleScroll = () => updateVisibility()
    const handleResize = () => updateVisibility()

    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(initialTimeout)
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [containerRef, getContainer, updateVisibility])

  const handleMoreClick = () => {
    const container = getContainer()
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleTopClick = () => {
    const container = getContainer()
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  // Fixed button size - not affected by zoom
  const buttonSize = 63 // Fixed button size in pixels
  const fontSize = 12 // Fixed font size
  const iconSize = 24 // Fixed icon size
  const bottomOffset = 45 // Fixed bottom offset
  const rightOffset = 50 // Fixed right offset

  if (!showMore && !showTop) return null

  const positionClass = useDirectContainer ? 'fixed' : 'absolute'

  return (
    <div 
      className={`${positionClass} z-[100] flex flex-col pointer-events-auto`}
      style={{
        bottom: `${bottomOffset}px`,
        right: `${rightOffset}px`,
        gap: '10px'
      }}
    >
      {showMore && (
        <button
          onClick={handleMoreClick}
          className="rounded-full border-0 cursor-pointer opacity-85 transition-opacity duration-200 text-white relative flex flex-col items-center justify-center"
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            backgroundColor: 'rgb(17, 89, 167)',
            fontSize: `${fontSize}px`
          }}
        >
          <span 
            className="absolute"
            style={{
              top: '14px',
              color: 'white',
              fontSize: '19px',
            }}
          >
            More
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="white"
            className="absolute rotate-180"
            style={{
              width: '25px',
              height: '25px',
              bottom: '6px',
            }}
          >
            <path d="M21.5 17.5l-9.5-9.5-9.5 9.5-2.5-2.5 12-12 12 12-2.5 2.5z"></path>
          </svg>
        </button>
      )}

      {showTop && (
        <button
          onClick={handleTopClick}
          className="rounded-full border-0 cursor-pointer opacity-85 transition-opacity duration-200 text-white relative flex flex-col items-center justify-center"
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            backgroundColor: 'rgb(60, 60, 60)',
            fontSize: `${fontSize}px`
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="white"
            className="absolute"
            style={{
              width: '24px',
              height: '24px',
              top: '8px',
            }}
          >
            <path d="M21.5 17.5l-9.5-9.5-9.5 9.5-2.5-2.5 12-12 12 12-2.5 2.5z"></path>
          </svg>
          <span 
            className="absolute"
            style={{
              bottom: '12px',
              fontSize: '18px',
              color: 'white',
            }}
          >
            Top
          </span>
        </button>
      )}
    </div>
  )
}

export default MoreTopButton

