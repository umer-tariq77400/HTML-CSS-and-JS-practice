# Web Accessibility with CSS

A demonstration project showcasing CSS techniques for creating accessible web designs. This project implements various accessibility features and best practices to ensure the website is usable by people with different abilities and assistive technologies.

## Features

### Navigation & Layout
- **Fixed Header Navigation**: Sticky header that remains visible while scrolling
- **Responsive Sidebar**: Collapsible sidebar with smooth slide animation
- **Toggle Functionality**: Interactive sidebar toggle using CSS-only implementation (checkbox hack)
- **Visual Toggle Indicator**: Moon emoji that changes from new moon (🌑) to full moon (🌕) when sidebar is active

### Accessibility Features
- **Screen Reader Support**: Proper semantic HTML structure with header, nav, main, and aside elements
- **Enhanced Focus Indicators**: High-contrast yellow outline (3px solid #ffd700) for focused elements
- **Skip Link Ready**: CSS styling prepared for skip navigation links
- **Large Text Options**: Increased font size (1.25em) for better readability
- **High Contrast Text**: Black text on white background with bold styling and borders

### Typography & Readability
- **Base Font Size**: 16px with 1.5 line-height for optimal readability
- **Font Family**: Arial sans-serif for better accessibility
- **Color Contrast**: Dark text (#333) on light background (#f9f9f9)
- **Structured Content**: Clear heading hierarchy and proper spacing

### Interactive Elements
- **Smooth Transitions**: 0.3s ease transitions for sidebar and content movement
- **Hover Effects**: Visual feedback on navigation links and toggle button
- **Content Spacing**: Proper margins and padding for comfortable reading

## File Structure

```
css-accessibility/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Complete CSS styling with accessibility features
└── README.md          # This documentation file
```

## CSS Implementation Details

### Sidebar Toggle Mechanism
- Uses hidden checkbox input for state management
- CSS sibling selectors (`~`) to control sidebar visibility
- Smooth slide animation from `left: -250px` (hidden) to `left: 0` (visible)
- Content automatically adjusts margin when sidebar is open

### Accessibility Enhancements
- Fixed positioning with proper z-index layering
- Color-coded navigation with green theme (#4caf50)
- Feature list with custom checkmark bullets (✓)
- High contrast sections for important content
- Consistent spacing and visual hierarchy

### Responsive Design
- Maximum content width of 1200px with auto centering
- Flexible layout that adapts to sidebar state
- Fixed header that doesn't interfere with content scrolling

## Browser Compatibility

This project uses standard CSS features that are widely supported:
- CSS transitions and transforms
- Fixed positioning
- Flexbox for header layout
- CSS pseudo-elements for custom styling

## Usage

1. Open `index.html` in a web browser
2. Click the moon icon in the header to toggle the sidebar
3. Navigate through the content to see accessibility features in action
4. Test with screen readers or keyboard navigation for full accessibility experience

## Accessibility Standards

This project demonstrates compliance with:
- WCAG guidelines for color contrast
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Clear visual hierarchy and spacing