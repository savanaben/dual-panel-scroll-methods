class ScrollIndicators {
    constructor(columnElement, moreBtnId, topBtnId) {
        this.column = columnElement;
        this.content = columnElement.querySelector('.column-content');
        this.moreBtn = document.getElementById(moreBtnId);
        this.topBtn = document.getElementById(topBtnId);
        
        this.isTopButtonActive = false;
        this.completedTopAction = false;
        this.lastScrollTop = 0;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.content.addEventListener('scroll', () => this.handleScroll());
        this.moreBtn.addEventListener('click', () => this.handleMoreClick());
        this.topBtn.addEventListener('click', () => this.handleTopClick());
        
        // Initial visibility check
        this.updateVisibility();
    }
    
    handleScroll() {
        this.updateVisibility();
    }
    
    handleMoreClick() {
        // Scroll to bottom of the column
        this.content.scrollTo({
            top: this.content.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    handleTopClick() {
        // Scroll to top of the column
        this.content.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    updateVisibility() {
        const scrollTop = this.content.scrollTop;
        const scrollHeight = this.content.scrollHeight;
        const clientHeight = this.content.clientHeight;
        
        let showMore = false;
        let showTop = false;
        
        if (scrollTop === 0) {
            // At the top
            if (this.isTopButtonActive) {
                this.isTopButtonActive = false;
                this.completedTopAction = true;
            } else if (!this.completedTopAction) {
                if (scrollHeight > clientHeight + 1) {
                    showMore = true;
                }
            }
        } else if (!this.completedTopAction) {
            // Not at the top
            if (clientHeight + scrollTop >= scrollHeight - 1) {
                // Near the bottom
                this.isTopButtonActive = true;
                showTop = true;
            } else if (this.isTopButtonActive) {
                showTop = true;
            } else {
                showMore = true;
            }
        }
        
        // Update button visibility
        this.moreBtn.style.display = showMore ? 'block' : 'none';
        this.topBtn.style.display = showTop ? 'block' : 'none';
    }
    
    reset() {
        this.isTopButtonActive = false;
        this.completedTopAction = false;
        this.lastScrollTop = 0;
        this.updateVisibility();
    }
}

// Export for use in main.js
window.ScrollIndicators = ScrollIndicators; 