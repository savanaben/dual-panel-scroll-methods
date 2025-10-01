import React from 'react'
import ContentPanel from '../../common/ContentPanel'
import MoreTopButton from '../../common/MoreTopButton'
import { useStickyScrollbars } from '../../../hooks/useStickyScrollbars'
import { useInnerFrameScroll } from '../../../hooks/useInnerFrameScroll'

const DualPanelLayout = ({ zoom, effectiveZoom, mode, outerContainerRef }) => {
  const { refs, handlers } = useStickyScrollbars(mode, outerContainerRef)
  const { leftColumnRef } = useInnerFrameScroll(mode)
  const isUnifiedScrollMode = mode === 'current'

  return (
    <>
      <div className="content-container">
        <div className="column left-column" ref={(el) => {
          refs.leftColumnRef.current = el
          leftColumnRef.current = el
        }}>
          <ContentPanel 
            side="left"
            zoom={zoom}
            effectiveZoom={effectiveZoom}
            mode={mode}
          />
          {!isUnifiedScrollMode && (
            <MoreTopButton 
              containerRef={refs.leftColumnRef}
              zoom={effectiveZoom}
            />
          )}
        </div>
        
        <div className="column right-column" ref={refs.rightColumnRef}>
          <ContentPanel 
            side="right"
            zoom={zoom}
            effectiveZoom={effectiveZoom}
            mode={mode}
          />
          {!isUnifiedScrollMode && (
            <MoreTopButton 
              containerRef={refs.rightColumnRef}
              zoom={effectiveZoom}
            />
          )}
        </div>
      </div>

      {isUnifiedScrollMode && (
        <MoreTopButton 
          containerRef={outerContainerRef}
          zoom={effectiveZoom}
          useDirectContainer
        />
      )}

      {/* Sticky Scrollbars for Method 2 */}
      <div 
        id="leftStickyScrollbar" 
        className="sticky-scrollbar" 
        ref={refs.leftStickyScrollbarRef}
        onClick={(e) => handlers.handleTrackClick(e, 'left')}
      >
        <div className="sticky-scrollbar-track">
          <div 
            className="sticky-scrollbar-thumb" 
            id="leftStickyThumb"
            ref={refs.leftStickyThumbRef}
            onMouseDown={(e) => handlers.startDrag(e, 'left')}
          />
        </div>
      </div>
      
      <div 
        id="rightStickyScrollbar" 
        className="sticky-scrollbar" 
        ref={refs.rightStickyScrollbarRef}
        onClick={(e) => handlers.handleTrackClick(e, 'right')}
      >
        <div className="sticky-scrollbar-track">
          <div 
            className="sticky-scrollbar-thumb" 
            id="rightStickyThumb"
            ref={refs.rightStickyThumbRef}
            onMouseDown={(e) => handlers.startDrag(e, 'right')}
          />
        </div>
      </div>
    </>
  )
}

export default DualPanelLayout
