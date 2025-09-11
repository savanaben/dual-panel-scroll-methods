class MainApp {
    constructor() {
        this.leftScrollIndicators = null;
        this.rightScrollIndicators = null;
        this.zoomController = null;
        
        this.init();
    }
    
    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }
    
    async setupApp() {
        // Load content
        await this.loadContent();
        
        // Initialize scroll indicators
        this.initializeScrollIndicators();
        
        // Initialize zoom controller
        this.initializeZoomController();
        
        // Set up MCQ functionality
        this.setupMcqFunctionality();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        console.log('Application initialized successfully');
    }
    
    async loadContent() {
        try {
            // Load left column content
            const leftResponse = await fetch('content/left-column.html');
            const leftContent = await leftResponse.text();
            document.getElementById('leftContent').innerHTML = leftContent;
            
            // Load right column content
            const rightResponse = await fetch('content/right-column.html');
            const rightContent = await rightResponse.text();
            document.getElementById('rightContent').innerHTML = rightContent;
            
        } catch (error) {
            console.error('Error loading content:', error);
            // Fallback content if files can't be loaded
            this.loadFallbackContent();
        }
    }
    
    loadFallbackContent() {
        // Fallback content for left column
        document.getElementById('leftContent').innerHTML = `
            <h1>More/Top Demos</h1>
            <h2>Content loaded successfully</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <textarea style="height: 60px;"></textarea>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <textarea style="height: 120px;"></textarea>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        `;
        
        // Fallback content for right column
        document.getElementById('rightContent').innerHTML = `
            <h1>Toggle Item View</h1>
            <h2>Multiple Choice Question Interface</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div class="mcq-options-container">
                <div class="mcq-option" data-option-id="a">
                    <div class="mcq-option-letter-radio">
                        <span class="mcq-option-letter">A</span>
                        <span class="mcq-option-radio-visual"></span>
                    </div>
                    <span class="mcq-option-text">Option A</span>
                    <button class="eliminate-choice-btn" title="Eliminate this choice"><span class="ec-dash-wrapper">–</span></button>
                </div>
                <div class="mcq-option" data-option-id="b">
                    <div class="mcq-option-letter-radio">
                        <span class="mcq-option-letter">B</span>
                        <span class="mcq-option-radio-visual"></span>
                    </div>
                    <span class="mcq-option-text">Option B</span>
                    <button class="eliminate-choice-btn" title="Eliminate this choice"><span class="ec-dash-wrapper">–</span></button>
                </div>
            </div>
            <button class="clear-answer-btn">Clear Answer</button>
            <p>Additional content to ensure scrolling is needed.</p>
            <textarea style="height: 150px;"></textarea>
            <div class="submit-container">
                <span>Select <strong>Submit</strong> when you are finished.</span>
                <button class="submit-btn">Submit</button>
            </div>
        `;
    }
    
    initializeScrollIndicators() {
        const leftColumn = document.querySelector('.left-column');
        const rightColumn = document.querySelector('.right-column');
        
        // Initialize scroll indicators for each column
        this.leftScrollIndicators = new ScrollIndicators(leftColumn, 'leftMoreBtn', 'leftTopBtn');
        this.rightScrollIndicators = new ScrollIndicators(rightColumn, 'rightMoreBtn', 'rightTopBtn');
    }
    
    initializeZoomController() {
        this.zoomController = new ZoomController();
    }
    
    setupMcqFunctionality() {
        // Set up eliminate choice buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.eliminate-choice-btn')) {
                const optionDiv = e.target.closest('.mcq-option');
                if (optionDiv && !optionDiv.classList.contains('dimmed-choice')) {
                    optionDiv.classList.add('dimmed-choice');
                }
            }
        });
        
        // Set up clear answer buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('clear-answer-btn')) {
                const dimmedChoices = e.target.closest('.column-content').querySelectorAll('.dimmed-choice');
                dimmedChoices.forEach(choice => choice.classList.remove('dimmed-choice'));
            }
        });
        
        // Set up submit buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('submit-btn')) {
                alert('Submit functionality would be implemented here.');
            }
        });
    }
    
    handleResize() {
        // Update scroll indicators when window resizes
        if (this.leftScrollIndicators) {
            this.leftScrollIndicators.updateVisibility();
        }
        if (this.rightScrollIndicators) {
            this.rightScrollIndicators.updateVisibility();
        }
    }
    
    // Public methods for external access
    resetScrollIndicators() {
        if (this.leftScrollIndicators) {
            this.leftScrollIndicators.reset();
        }
        if (this.rightScrollIndicators) {
            this.rightScrollIndicators.reset();
        }
    }
    
    getZoomLevel() {
        return this.zoomController ? this.zoomController.getCurrentZoom() : 100;
    }
}

// Initialize the application
const app = new MainApp();

// Make app globally accessible for debugging
window.app = app; 