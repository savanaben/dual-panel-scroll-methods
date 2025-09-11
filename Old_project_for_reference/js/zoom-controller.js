class ZoomController {
    constructor() {
        this.currentZoom = 100;
        this.minZoom = 100; // No zoom below 100%
        this.maxZoom = 200;
        this.zoomStep = 25;
        this.baseWidth = 1366; // Base design width
        
        this.container = document.querySelector('.content-container');
        this.outerContainer = document.querySelector('.outer-container');
        this.zoomLevelDisplay = document.getElementById('zoomLevel');
        
        // Height calculation method toggle
        this.heightMethod = 2; // 1 = Original Method, 2 = Dynamic Method
        
        // Sticky scrollbars instance
        this.stickyScrollbars = null;
        
        this.init();
    }
    
    init() {
        // Add event listeners for zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOutBtn').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetZoomBtn').addEventListener('click', () => this.resetZoom());
        document.getElementById('toggleMethodBtn').addEventListener('click', () => this.toggleHeightMethod());
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '=':
                    case '+':
                        e.preventDefault();
                        this.zoomIn();
                        break;
                    case '-':
                        e.preventDefault();
                        this.zoomOut();
                        break;
                    case '0':
                        e.preventDefault();
                        this.resetZoom();
                        break;
                }
            }
        });
        
        // Add wheel zoom support
        this.container.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                if (e.deltaY < 0) {
                    this.zoomIn();
                } else {
                    this.zoomOut();
                }
            }
        });
        
        // Add window resize handler
        window.addEventListener('resize', () => {
            this.updateHeights();
            this.updateResponsiveZoom();
        });
        
        this.updateZoomDisplay();
        this.updateMethodDisplay();
        this.updateHeights(); // Initial height calculation
        this.updateResponsiveZoom(); // Initial responsive zoom calculation
        
        // Initialize sticky scrollbars
        this.stickyScrollbars = new StickyScrollbars();
        if (this.heightMethod === 2) {
            this.stickyScrollbars.activate();
        }
    }
    
    zoomIn() {
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom += this.zoomStep;
            this.applyZoom();
        }
    }
    
    zoomOut() {
        if (this.currentZoom > this.minZoom) {
            this.currentZoom -= this.zoomStep;
            this.applyZoom();
        }
    }
    
    resetZoom() {
        this.currentZoom = 100;
        this.applyZoom();
    }
    
    applyZoom() {
        if (this.heightMethod === 1) {
            this.applyMethod1Zoom();
        } else {
            this.applyMethod2Zoom();
        }
        
        this.updateZoomDisplay();
        
        // Update sticky scrollbars for Method 2
        if (this.stickyScrollbars && this.heightMethod === 2) {
            this.stickyScrollbars.updateAll();
        }
        
        // Trigger resize event for scroll indicators
        window.dispatchEvent(new Event('resize'));
    }
    
    applyMethod1Zoom() {
        // Method 1: CSS variables scaling (same as Method 2) but simpler behavior
        const responsiveZoomFactor = this.calculateResponsiveZoomFactor();
        const manualZoomFactor = this.currentZoom / 100;
        const finalZoomFactor = responsiveZoomFactor * manualZoomFactor;
        
        // Update CSS variable for zoom factor (same as Method 2)
        document.documentElement.style.setProperty('--zoom-factor', finalZoomFactor);
        
        // Reset any transform
        this.container.style.transform = '';
        
        // Update heights
        this.updateHeights();
        
        // Method 1: Simple scrolling behavior - outer container handles all scrolling
        // (CSS already sets overflow: auto for Method 1)
        
        console.log(`Method 1: CSS Variables --zoom-factor: ${finalZoomFactor.toFixed(2)} (Simple scrolling)`);
    }
    
    applyMethod2Zoom() {
        // Method 2: CSS variable-based scaling
        const responsiveZoomFactor = this.calculateResponsiveZoomFactor();
        const manualZoomFactor = this.currentZoom / 100;
        const finalZoomFactor = responsiveZoomFactor * manualZoomFactor;
        
        // Update CSS variable for zoom factor
        document.documentElement.style.setProperty('--zoom-factor', finalZoomFactor);
        
        // Reset any transform that might have been applied by Method 1
        this.container.style.transform = '';
        
        // Update heights
        this.updateHeights();
        
        // Enable horizontal scrolling if content is larger than viewport
        const contentWidth = this.baseWidth * finalZoomFactor;
        const viewportWidth = window.innerWidth;
        
        if (contentWidth > viewportWidth) {
            this.outerContainer.style.overflow = 'auto';
        } else {
            this.outerContainer.style.overflow = 'auto';
        }
        
        console.log(`Method 2: CSS Variables --zoom-factor: ${finalZoomFactor.toFixed(2)}`);
    }
    
    updateZoomDisplay() {
        const effectiveZoom = this.getCurrentEffectiveZoom();
        const responsiveZoom = this.calculateResponsiveZoomFactor() * 100;
        
        // Show both manual zoom and effective zoom
        this.zoomLevelDisplay.innerHTML = `
            Manual: ${this.currentZoom}%<br>
            <small>Effective: ${effectiveZoom.toFixed(0)}%</small><br>
            <small>Responsive: ${responsiveZoom.toFixed(0)}%</small>
        `;
        
        // Update button states
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        
        zoomInBtn.disabled = this.currentZoom >= this.maxZoom;
        zoomOutBtn.disabled = this.currentZoom <= this.minZoom;
        
        // Update button styles
        zoomInBtn.style.opacity = this.currentZoom >= this.maxZoom ? '0.5' : '1';
        zoomOutBtn.style.opacity = this.currentZoom <= this.minZoom ? '0.5' : '1';
    }
    
    getCurrentZoom() {
        return this.currentZoom;
    }
    
    setZoom(zoomLevel) {
        this.currentZoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoomLevel));
        this.applyZoom();
    }
    
    // Method selection and toggle functionality
    toggleHeightMethod() {
        this.heightMethod = this.heightMethod === 1 ? 2 : 1;
        this.updateMethodDisplay();
        this.updateHeights();
        
        // Toggle sticky scrollbars
        if (this.stickyScrollbars) {
            if (this.heightMethod === 2) {
                this.stickyScrollbars.activate();
            } else {
                this.stickyScrollbars.deactivate();
            }
        }
        
        console.log(`Switched to Height Method ${this.heightMethod}`);
    }
    
    updateMethodDisplay() {
        const toggleBtn = document.getElementById('toggleMethodBtn');
        toggleBtn.textContent = `Method ${this.heightMethod}`;
        toggleBtn.style.backgroundColor = this.heightMethod === 1 ? '#dc3545' : '#007bff';
    }
    
    updateHeights() {
        if (this.heightMethod === 1) {
            this.updateHeightsMethod1();
        } else {
            this.updateHeightsMethod2();
        }
    }
    
    // METHOD 1: CSS variables scaling with simple height calculation
    updateHeightsMethod1() {
        // Simple height calculation (no scrollbar awareness)
        this.container.style.height = 'calc(100vh - 138px)';
        
        // Reset column heights to use flexbox
        const columns = document.querySelectorAll('.column');
        columns.forEach(column => {
            column.style.height = '';
        });
        
        console.log(`Method 1: Simple calc(100vh - 138px), CSS variable scaling`);
    }
    
    // METHOD 2: Dynamic height calculation with zoom and scrollbar awareness
    updateHeightsMethod2() {
        const viewportHeight = window.innerHeight;
        const toolbarHeight = 120;
        const scrollbarHeight = this.currentZoom > 100 ? 18 : 0; // Only account for scrollbar when zoomed in
        const availableHeight = viewportHeight - toolbarHeight - scrollbarHeight;
        
        // Calculate the height as a percentage of viewport
        const heightPercentage = (availableHeight / viewportHeight) * 100;
        
        // With CSS variables, we don't need to adjust for scale since CSS handles it
        // Set container height using the calculated percentage
        this.container.style.height = `${heightPercentage}vh`;
        
        // Update individual columns to use the same height
        const columns = document.querySelectorAll('.column');
        columns.forEach(column => {
            column.style.height = `${heightPercentage}vh`;
        });
        
        // Debug logging
        console.log(`Method 2: Viewport: ${viewportHeight}px, Toolbar: ${toolbarHeight}px, Scrollbar: ${scrollbarHeight}px, Available: ${availableHeight}px, Height: ${heightPercentage.toFixed(2)}%, Zoom Factor: ${this.currentZoom}% (CSS Variables)`);
    }
    
    calculateResponsiveZoomFactor() {
        const viewportWidth = window.innerWidth;
        
        // If viewport is wider than base width, scale up proportionally
        // If viewport is narrower than base width, scale down proportionally
        const responsiveZoomFactor = viewportWidth / this.baseWidth;
        
        // Don't go below a minimum scale to maintain readability
        const minResponsiveZoom = 0.5;
        const maxResponsiveZoom = 3.0; // Allow quite large scaling
        
        return Math.max(minResponsiveZoom, Math.min(maxResponsiveZoom, responsiveZoomFactor));
    }
    
    updateResponsiveZoom() {
        // This method is called on window resize
        // Re-apply the current zoom to recalculate responsive factors
        this.applyZoom();
    }
    
    getCurrentEffectiveZoom() {
        const responsiveZoomFactor = this.calculateResponsiveZoomFactor();
        const manualZoomFactor = this.currentZoom / 100;
        return responsiveZoomFactor * manualZoomFactor * 100; // Return as percentage
    }
}

// Export for use in main.js
window.ZoomController = ZoomController; 