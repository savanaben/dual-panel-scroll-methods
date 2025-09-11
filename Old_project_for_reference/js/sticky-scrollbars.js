class StickyScrollbars {
    constructor() {
        this.leftColumn = document.querySelector('.left-column .column-content');
        this.rightColumn = document.querySelector('.right-column .column-content');
        this.leftStickyScrollbar = document.getElementById('leftStickyScrollbar');
        this.rightStickyScrollbar = document.getElementById('rightStickyScrollbar');
        this.leftStickyThumb = document.getElementById('leftStickyThumb');
        this.rightStickyThumb = document.getElementById('rightStickyThumb');
        this.outerContainer = document.querySelector('.outer-container');
        
        this.isActive = false;
        this.isDragging = false;
        this.dragData = null;
        
        this.init();
    }
    
    init() {
        // Add scroll listeners
        this.leftColumn.addEventListener('scroll', () => this.updateScrollbarThumb('left'));
        this.rightColumn.addEventListener('scroll', () => this.updateScrollbarThumb('right'));
        this.outerContainer.addEventListener('scroll', () => this.updateVisibility());
        
        // Add drag functionality
        this.leftStickyThumb.addEventListener('mousedown', (e) => this.startDrag(e, 'left'));
        this.rightStickyThumb.addEventListener('mousedown', (e) => this.startDrag(e, 'right'));
        
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Add click on track functionality
        this.leftStickyScrollbar.addEventListener('click', (e) => this.handleTrackClick(e, 'left'));
        this.rightStickyScrollbar.addEventListener('click', (e) => this.handleTrackClick(e, 'right'));
        
        // Add window resize listener
        window.addEventListener('resize', () => this.updateAll());
    }
    
    activate() {
        this.isActive = true;
        document.body.classList.add('method-2');
        document.body.classList.remove('method-1');
        this.updateAll();
    }
    
    deactivate() {
        this.isActive = false;
        document.body.classList.add('method-1');
        document.body.classList.remove('method-2');
        this.leftStickyScrollbar.classList.remove('visible');
        this.rightStickyScrollbar.classList.remove('visible');
    }
    
    updateAll() {
        if (!this.isActive) return;
        
        this.updateVisibility();
        this.updateScrollbarThumb('left');
        this.updateScrollbarThumb('right');
        this.updateScrollbarHeights();
    }
    
    updateVisibility() {
        if (!this.isActive) return;
        
        const outerContainerRect = this.outerContainer.getBoundingClientRect();
        const leftColumnRect = this.leftColumn.getBoundingClientRect();
        const rightColumnRect = this.rightColumn.getBoundingClientRect();
        
        // Check if left column is visible
        const leftVisible = leftColumnRect.right > outerContainerRect.left && 
                           leftColumnRect.left < outerContainerRect.right;
        
        // Check if right column is visible
        const rightVisible = rightColumnRect.right > outerContainerRect.left && 
                            rightColumnRect.left < outerContainerRect.right;
        
        // Show/hide sticky scrollbars based on visibility
        if (leftVisible && !rightVisible) {
            // Only left column visible - show sticky left scrollbar
            this.leftStickyScrollbar.classList.add('visible');
            this.rightStickyScrollbar.classList.remove('visible');
        } else if (rightVisible && !leftVisible) {
            // Only right column visible - show sticky right scrollbar
            this.leftStickyScrollbar.classList.remove('visible');
            this.rightStickyScrollbar.classList.add('visible');
        } else if (leftVisible && rightVisible) {
            // Both columns visible - show sticky right scrollbar only
            // Left column will use its native scrollbar
            this.leftStickyScrollbar.classList.remove('visible');
            this.rightStickyScrollbar.classList.add('visible');
        } else {
            // No columns visible - hide all sticky scrollbars
            this.leftStickyScrollbar.classList.remove('visible');
            this.rightStickyScrollbar.classList.remove('visible');
        }
        
        // Update native scrollbar visibility
        this.updateNativeScrollbars(leftVisible, rightVisible);
    }
    
    updateNativeScrollbars(leftVisible, rightVisible) {
        const leftColumn = document.querySelector('.left-column');
        const rightColumn = document.querySelector('.right-column');
        
        if (leftVisible && rightVisible) {
            // Both columns visible - show left native scrollbar, hide right native scrollbar
            leftColumn.classList.add('show-native-scrollbar');
            rightColumn.classList.remove('show-native-scrollbar');
        } else {
            // One or no columns visible - hide all native scrollbars
            leftColumn.classList.remove('show-native-scrollbar');
            rightColumn.classList.remove('show-native-scrollbar');
        }
    }
    
    updateScrollbarHeights() {
        if (!this.isActive) return;
        
        const viewportHeight = window.innerHeight;
        const toolbarHeight = 120;
        const availableHeight = viewportHeight - toolbarHeight;
        
        this.leftStickyScrollbar.style.height = `${availableHeight}px`;
        this.rightStickyScrollbar.style.height = `${availableHeight}px`;
    }
    
    updateScrollbarThumb(side) {
        if (!this.isActive) return;
        
        const column = side === 'left' ? this.leftColumn : this.rightColumn;
        const thumb = side === 'left' ? this.leftStickyThumb : this.rightStickyThumb;
        
        const scrollTop = column.scrollTop;
        const scrollHeight = column.scrollHeight;
        const clientHeight = column.clientHeight;
        
        if (scrollHeight <= clientHeight) {
            // No scrolling needed
            thumb.style.display = 'none';
            return;
        }
        
        thumb.style.display = 'block';
        
        // Calculate thumb size and position
        const thumbRatio = clientHeight / scrollHeight;
        const thumbHeight = Math.max(thumbRatio * clientHeight, 20); // Minimum 20px
        const maxThumbTop = clientHeight - thumbHeight;
        const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;
        
        thumb.style.height = `${thumbHeight}px`;
        thumb.style.top = `${thumbTop}px`;
    }
    
    startDrag(e, side) {
        e.preventDefault();
        this.isDragging = true;
        
        const column = side === 'left' ? this.leftColumn : this.rightColumn;
        const thumb = side === 'left' ? this.leftStickyThumb : this.rightStickyThumb;
        
        this.dragData = {
            side,
            column,
            thumb,
            startY: e.clientY,
            startScrollTop: column.scrollTop,
            thumbRect: thumb.getBoundingClientRect()
        };
        
        document.body.style.userSelect = 'none';
    }
    
    handleDrag(e) {
        if (!this.isDragging || !this.dragData) return;
        
        const { column, startY, startScrollTop } = this.dragData;
        const deltaY = e.clientY - startY;
        
        const scrollHeight = column.scrollHeight;
        const clientHeight = column.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        // Calculate scroll ratio
        const scrollRatio = deltaY / clientHeight;
        const newScrollTop = Math.max(0, Math.min(maxScroll, startScrollTop + (scrollRatio * scrollHeight)));
        
        column.scrollTop = newScrollTop;
    }
    
    endDrag() {
        this.isDragging = false;
        this.dragData = null;
        document.body.style.userSelect = '';
    }
    
    handleTrackClick(e, side) {
        if (e.target.classList.contains('sticky-scrollbar-thumb')) return;
        
        const column = side === 'left' ? this.leftColumn : this.rightColumn;
        const scrollbar = side === 'left' ? this.leftStickyScrollbar : this.rightStickyScrollbar;
        
        const rect = scrollbar.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const scrollbarHeight = rect.height;
        
        const scrollRatio = clickY / scrollbarHeight;
        const maxScroll = column.scrollHeight - column.clientHeight;
        
        column.scrollTop = scrollRatio * maxScroll;
    }
}

// Export for use in main.js
window.StickyScrollbars = StickyScrollbars;