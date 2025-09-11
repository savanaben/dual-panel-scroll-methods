import { useState, useEffect, useCallback, useRef } from 'react'

export const useStickyScrollbars = (mode, outerContainerRef) => {
  const [isActive, setIsActive] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragDataRef = useRef(null)
  
  // Refs for DOM elements
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)
  const leftStickyScrollbarRef = useRef(null)
  const rightStickyScrollbarRef = useRef(null)
  const leftStickyThumbRef = useRef(null)
  const rightStickyThumbRef = useRef(null)

  const deactivate = useCallback(() => {
    if (leftStickyScrollbarRef.current) {
      leftStickyScrollbarRef.current.classList.remove('visible')
    }
    if (rightStickyScrollbarRef.current) {
      rightStickyScrollbarRef.current.classList.remove('visible')
    }
  }, [])

  const updateNativeScrollbars = useCallback((leftVisible, rightVisible) => {
    const leftColumn = document.querySelector('.left-column')
    const rightColumn = document.querySelector('.right-column')
    
    if (!leftColumn || !rightColumn) return
    
    if (leftVisible && rightVisible) {
      // Both columns visible - show left native scrollbar, hide right native scrollbar
      leftColumn.classList.add('show-native-scrollbar')
      rightColumn.classList.remove('show-native-scrollbar')
    } else {
      // One or no columns visible - hide all native scrollbars
      leftColumn.classList.remove('show-native-scrollbar')
      rightColumn.classList.remove('show-native-scrollbar')
    }
  }, [])

  const updateScrollbarHeights = useCallback(() => {
    if (!isActive) return
    
    const viewportHeight = window.innerHeight
    const toolbarHeight = 120
    const availableHeight = viewportHeight - toolbarHeight
    
    if (leftStickyScrollbarRef.current) {
      leftStickyScrollbarRef.current.style.height = `${availableHeight}px`
    }
    if (rightStickyScrollbarRef.current) {
      rightStickyScrollbarRef.current.style.height = `${availableHeight}px`
    }
  }, [isActive])

  const updateScrollbarThumb = useCallback((side) => {
    if (!isActive) return
    
    const column = side === 'left' ? leftColumnRef.current?.querySelector('.column-content') : rightColumnRef.current?.querySelector('.column-content')
    const thumb = side === 'left' ? leftStickyThumbRef.current : rightStickyThumbRef.current
    
    if (!column || !thumb) return
    
    const scrollTop = column.scrollTop
    const scrollHeight = column.scrollHeight
    const clientHeight = column.clientHeight
    
    if (scrollHeight <= clientHeight) {
      // No scrolling needed
      thumb.style.display = 'none'
      return
    }
    
    thumb.style.display = 'block'
    
    // Calculate thumb size and position
    const thumbRatio = clientHeight / scrollHeight
    const thumbHeight = Math.max(thumbRatio * clientHeight, 20) // Minimum 20px
    const maxThumbTop = clientHeight - thumbHeight
    const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop
    
    thumb.style.height = `${thumbHeight}px`
    thumb.style.top = `${thumbTop}px`
  }, [isActive])

  const updateVisibility = useCallback(() => {
    if (!isActive || !outerContainerRef?.current || !leftColumnRef.current || !rightColumnRef.current) return
    
    const outerContainerRect = outerContainerRef.current.getBoundingClientRect()
    const leftColumnRect = leftColumnRef.current.getBoundingClientRect()
    const rightColumnRect = rightColumnRef.current.getBoundingClientRect()
    
    // Check if columns are visible within the outer container
    const leftVisible = leftColumnRect.right > outerContainerRect.left && 
                       leftColumnRect.left < outerContainerRect.right
    const rightVisible = rightColumnRect.right > outerContainerRect.left && 
                        rightColumnRect.left < outerContainerRect.right
    
    // Check if columns have scrollable content
    const leftColumnContent = leftColumnRef.current?.querySelector('.column-content')
    const rightColumnContent = rightColumnRef.current?.querySelector('.column-content')
    
    const leftHasScroll = leftColumnContent && leftColumnContent.scrollHeight > leftColumnContent.clientHeight
    const rightHasScroll = rightColumnContent && rightColumnContent.scrollHeight > rightColumnContent.clientHeight
    
    // Show/hide sticky scrollbars based on visibility AND scrollability
    if (leftVisible && !rightVisible && leftHasScroll) {
      // Only left column visible and has scroll - show sticky left scrollbar
      if (leftStickyScrollbarRef.current) {
        leftStickyScrollbarRef.current.classList.add('visible')
      }
      if (rightStickyScrollbarRef.current) {
        rightStickyScrollbarRef.current.classList.remove('visible')
      }
    } else if (rightVisible && !leftVisible && rightHasScroll) {
      // Only right column visible and has scroll - show sticky right scrollbar
      if (leftStickyScrollbarRef.current) {
        leftStickyScrollbarRef.current.classList.remove('visible')
      }
      if (rightStickyScrollbarRef.current) {
        rightStickyScrollbarRef.current.classList.add('visible')
      }
    } else if (leftVisible && rightVisible && rightHasScroll) {
      // Both columns visible and right has scroll - show sticky right scrollbar only
      // Left column will use its native scrollbar
      if (leftStickyScrollbarRef.current) {
        leftStickyScrollbarRef.current.classList.remove('visible')
      }
      if (rightStickyScrollbarRef.current) {
        rightStickyScrollbarRef.current.classList.add('visible')
      }
    } else {
      // No columns visible or no scrollable content - hide all sticky scrollbars
      if (leftStickyScrollbarRef.current) {
        leftStickyScrollbarRef.current.classList.remove('visible')
      }
      if (rightStickyScrollbarRef.current) {
        rightStickyScrollbarRef.current.classList.remove('visible')
      }
    }
    
    // Update native scrollbar visibility
    updateNativeScrollbars(leftVisible, rightVisible)
  }, [isActive, updateNativeScrollbars])

  const updateAll = useCallback(() => {
    if (!isActive) return
    
    updateVisibility()
    updateScrollbarThumb('left')
    updateScrollbarThumb('right')
    updateScrollbarHeights()
  }, [isActive, updateVisibility, updateScrollbarThumb, updateScrollbarHeights])

  const startDrag = useCallback((e, side) => {
    e.preventDefault()
    setIsDragging(true)
    
    const column = side === 'left' ? leftColumnRef.current?.querySelector('.column-content') : rightColumnRef.current?.querySelector('.column-content')
    const thumb = side === 'left' ? leftStickyThumbRef.current : rightStickyThumbRef.current
    
    if (!column || !thumb) return
    
    dragDataRef.current = {
      side,
      column,
      thumb,
      startY: e.clientY,
      startScrollTop: column.scrollTop,
      thumbRect: thumb.getBoundingClientRect()
    }
    
    document.body.style.userSelect = 'none'
  }, [])

  const handleDrag = useCallback((e) => {
    if (!isDragging || !dragDataRef.current) return
    
    const { column, startY, startScrollTop } = dragDataRef.current
    const deltaY = e.clientY - startY
    
    const scrollHeight = column.scrollHeight
    const clientHeight = column.clientHeight
    const maxScroll = scrollHeight - clientHeight
    
    // Calculate scroll ratio
    const scrollRatio = deltaY / clientHeight
    const newScrollTop = Math.max(0, Math.min(maxScroll, startScrollTop + (scrollRatio * scrollHeight)))
    
    column.scrollTop = newScrollTop
  }, [isDragging])

  const endDrag = useCallback(() => {
    setIsDragging(false)
    dragDataRef.current = null
    document.body.style.userSelect = ''
  }, [])

  const handleTrackClick = useCallback((e, side) => {
    if (e.target.classList.contains('sticky-scrollbar-thumb')) return
    
    const column = side === 'left' ? leftColumnRef.current?.querySelector('.column-content') : rightColumnRef.current?.querySelector('.column-content')
    const scrollbar = side === 'left' ? leftStickyScrollbarRef.current : rightStickyScrollbarRef.current
    
    if (!column || !scrollbar) return
    
    const rect = scrollbar.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const scrollbarHeight = rect.height
    
    const scrollRatio = clickY / scrollbarHeight
    const maxScroll = column.scrollHeight - column.clientHeight
    
    column.scrollTop = scrollRatio * maxScroll
  }, [])

  // Activate/deactivate based on mode
  useEffect(() => {
    const shouldBeActive = mode === 'method-2'
    setIsActive(shouldBeActive)
    
    if (shouldBeActive) {
      // Delay the update to ensure DOM elements are ready
      setTimeout(() => {
        updateAll()
      }, 100)
    } else {
      deactivate()
    }
  }, [mode, updateAll, deactivate])

  // Listen for zoom changes and update scrollbars
  useEffect(() => {
    if (!isActive) return

    const handleZoomChange = () => {
      setTimeout(() => {
        updateAll()
      }, 50)
    }

    // Listen for CSS variable changes (zoom changes)
    const observer = new MutationObserver(() => {
      handleZoomChange()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    return () => observer.disconnect()
  }, [isActive, updateAll])

  // Set up event listeners
  useEffect(() => {
    if (!isActive) return

    const leftColumnContent = leftColumnRef.current?.querySelector('.column-content')
    const rightColumnContent = rightColumnRef.current?.querySelector('.column-content')
    const outerContainer = outerContainerRef?.current

    const handleLeftScroll = () => updateScrollbarThumb('left')
    const handleRightScroll = () => updateScrollbarThumb('right')
    const handleOuterScroll = () => updateVisibility()
    const handleResize = () => updateAll()

    // Add scroll listeners
    if (leftColumnContent) {
      leftColumnContent.addEventListener('scroll', handleLeftScroll)
    }
    if (rightColumnContent) {
      rightColumnContent.addEventListener('scroll', handleRightScroll)
    }
    if (outerContainer) {
      outerContainer.addEventListener('scroll', handleOuterScroll)
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Mouse event listeners for dragging
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', endDrag)

    return () => {
      if (leftColumnContent) {
        leftColumnContent.removeEventListener('scroll', handleLeftScroll)
      }
      if (rightColumnContent) {
        rightColumnContent.removeEventListener('scroll', handleRightScroll)
      }
      if (outerContainer) {
        outerContainer.removeEventListener('scroll', handleOuterScroll)
      }
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', endDrag)
    }
  }, [isActive, updateScrollbarThumb, updateVisibility, updateAll, handleDrag, endDrag])

  return {
    isActive,
    refs: {
      leftColumnRef,
      rightColumnRef,
      leftStickyScrollbarRef,
      rightStickyScrollbarRef,
      leftStickyThumbRef,
      rightStickyThumbRef
    },
    handlers: {
      startDrag,
      handleTrackClick
    },
    updateAll
  }
}