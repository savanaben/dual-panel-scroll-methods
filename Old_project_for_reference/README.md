# Isometric Zoom Layout with Scroll Indicators

A modern, modular web application featuring a fixed aspect ratio (1366x768) two-column layout with independent scrolling and isometric zoom functionality.

## Features

- **Responsive Height Layout**: Fixed 1366px width with responsive height that fills the browser window
- **Two-Column Design**: Independent scrolling columns with 46.66px horizontal and 26.66px vertical padding
- **Scroll Indicators**: More/Top buttons for each column that appear based on scroll position
- **Isometric Zoom**: Scale content from 50% to 200% with horizontal scrolling when zoomed in
- **Sticky Toolbar**: 120px gray toolbar at the top for spacing
- **Responsive Design**: Vertically responsive (fills available height) with fixed horizontal width
- **Modular Architecture**: Clean separation of concerns across multiple files

## File Structure

```
scroll-indicator/
├── index.html              # Main HTML file
├── styles/
│   ├── layout.css          # Layout and responsive design
│   ├── buttons.css         # Scroll indicator button styles
│   └── content.css         # Content styling (text, forms, etc.)
├── js/
│   ├── scroll-indicators.js # Scroll indicator logic
│   ├── zoom-controller.js  # Zoom functionality
│   └── main.js            # Main application logic
├── content/
│   ├── left-column.html    # Left column content
│   └── right-column.html   # Right column content
└── README.md              # This file
```

## Usage

### Basic Navigation
- **More Button**: Scrolls to the bottom of the respective column
- **Top Button**: Scrolls to the top of the respective column
- Each column scrolls independently

### Zoom Controls
- **Zoom In/Out Buttons**: Click to adjust zoom level
- **Reset Button**: Return to 100% zoom
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + =` or `Ctrl/Cmd + +`: Zoom in
  - `Ctrl/Cmd + -`: Zoom out
  - `Ctrl/Cmd + 0`: Reset zoom
- **Mouse Wheel**: `Ctrl/Cmd + Scroll` to zoom in/out

### Zoom Behavior
- **50% - 100%**: Content scales down proportionally, no horizontal scrolling
- **100% - 200%**: Content scales up proportionally, horizontal scrolling enabled
- **Zoom Origin**: Scales from the upper left corner
- **Unified Scrolling**: When zoomed in, both columns scroll together horizontally as a single unit
- **Responsive**: Layout adapts to browser window height changes

## Technical Details

### Layout System
- Fixed width container (1366px) with responsive height
- Fills 100% of browser window height (minus 120px toolbar)
- Centered horizontally at 100% zoom
- Sticky 120px top toolbar
- Two equal-width columns with independent vertical scrolling
- Unified horizontal scrolling when zoomed in

### Scroll Indicators
- Appear when content overflows
- More button shows when at top with more content below
- Top button shows when near bottom
- Smooth scrolling animations
- Independent state management per column

### Zoom System
- CSS transform-based scaling
- Maintains aspect ratio during zoom
- Enables horizontal scrolling when zoomed in
- Smooth transitions between zoom levels

## Browser Compatibility
- Modern browsers with CSS Grid and Flexbox support
- ES6+ JavaScript features
- CSS transforms and transitions

## Development

### Adding Content
- Edit `content/left-column.html` for left column content
- Edit `content/right-column.html` for right column content
- Content is loaded dynamically via fetch API

### Customizing Styles
- `styles/layout.css`: Main layout and responsive design
- `styles/buttons.css`: Scroll indicator button appearance
- `styles/content.css`: Text, forms, and content styling

### Extending Functionality
- `js/scroll-indicators.js`: Scroll indicator behavior
- `js/zoom-controller.js`: Zoom functionality
- `js/main.js`: Main application logic and initialization

## Future Enhancements
- Additional zoom levels
- Custom scroll indicator behaviors
- Content management system
- Accessibility improvements
- Performance optimizations 

