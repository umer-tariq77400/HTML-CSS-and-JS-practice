# World Trivia Website

A modern, fully responsive trivia website showcasing advanced HTML5, CSS3, and JavaScript techniques with comprehensive accessibility features.

## 🌟 Project Overview

World Trivia is an interactive website that tests users' knowledge about countries, cultures, and fascinating facts from around the globe. The project demonstrates modern web development practices including semantic HTML, advanced CSS layouts, accessibility compliance, and responsive design.

## 🏗️ Project Structure

```
world-trivia/
├── index.html          # Main HTML document
├── styles.css          # Complete stylesheet
└── README.md          # Project documentation
```

## 🎯 Features

### Core Sections

- **Home Section**: Welcome message with project introduction
- **Trivia Facts**: Grid-based showcase of world facts with images
- **Categories**: Interactive category selection with hover effects
- **Scores Leaderboard**: Responsive data table with mobile optimization
- **Contact Form**: Fully functional contact form with validation
- **Newsletter Subscription**: Call-to-action with animated elements
- **Footer**: Multi-column layout with quick links and accessibility features

## 🛠️ HTML5 Technologies Used

### Semantic Structure

- **Semantic Elements**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Proper Heading Hierarchy**: Single `<h1>` in header, followed by `<h2>` for sections
- **Landmark Elements**: Clear document structure for screen readers

### Accessibility Features

- **ARIA Labels**: `aria-label`, `aria-labelledby`, `aria-describedby`
- **Skip Navigation**: Direct link to main content for keyboard users
- **Screen Reader Support**: Visually hidden content for context
- **Table Accessibility**: `scope` attributes, captions, and data labels
- **Form Accessibility**: Proper labels, validation, and helpful descriptions

### Modern HTML5 Elements

- **Data Attributes**: `data-label` for responsive table design
- **Form Elements**: Contact form with validation and semantic input types
- **Table Structure**: Proper `<thead>`, `<tbody>`, `<th>`, `<td>` structure

## 🎨 CSS3 Technologies Used

### Layout Systems

- **CSS Grid**:
  - Auto-fit grid for trivia items: `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`
  - Footer layout: `grid-template-columns: 1fr 1fr 1fr`
- **Flexbox**: Navigation, form elements, and component alignment
- **Sticky Positioning**: Fixed header with `position: sticky`

### Advanced Visual Effects

- **Linear Gradients**: Multiple gradient backgrounds throughout sections
- **Box Shadows**: Layered shadows for depth and modern appearance
- **Backdrop Filters**: Glass-morphism effect on header with `backdrop-filter: blur(10px)`
- **CSS Transforms**: Hover animations with `translateY()`, `scale()`, `rotate()`
- **CSS Transitions**: Smooth animations with cubic-bezier timing functions

### Modern CSS Features

- **CSS Custom Properties**: Consistent color scheme implementation
- **CSS Grid Auto-Fit**: Responsive layout without media queries
- **CSS Clipping**: Modern `clip-path` for accessibility features
- **Feature Queries**: Progressive enhancement with `@supports`

### Responsive Design

- **Mobile-First Approach**: Breakpoints at 768px, 600px, and 480px
- **Flexible Layouts**: Fluid grids and flexible containers
- **Responsive Tables**: Mobile-optimized table with stacked layout
- **Adaptive Typography**: Scalable font sizes across devices

### Accessibility & UX

- **Focus Management**: Custom focus indicators with `outline` properties
- **High Contrast Support**: `@media (prefers-contrast: more)`
- **Reduced Motion**: `@media (prefers-reduced-motion: reduce)`
- **Color Contrast**: WCAG compliant color combinations

### CSS Animations

- **Keyframe Animations**:
  - Pulse animation for subscription button
  - Floating animation for benefit icons
- **Hover Effects**: Interactive elements with smooth transitions
- **Progressive Enhancement**: Animations disabled for users with motion sensitivity

## 📱 Responsive Design Features

### Breakpoint Strategy

- **Desktop (>768px)**: Full multi-column layouts
- **Tablet (≤768px)**: Adjusted spacing and simplified layouts
- **Mobile (≤600px)**: Single-column layouts and stacked tables
- **Small Mobile (≤480px)**: Optimized for small screens

### Mobile Optimizations

- **Responsive Navigation**: Centered navigation with flexible wrapping
- **Mobile Tables**: Card-based layout with data labels
- **Touch-Friendly**: Larger tap targets and appropriate spacing
- **Readable Typography**: Optimized font sizes for mobile reading

## ⚡ JavaScript Functionality

### Enhanced Header Behavior

- **Scroll Detection**: Dynamic header shadow based on scroll position
- **Backdrop Filter Enhancement**: Progressive blur effect while scrolling
- **Smooth Scrolling**: Custom smooth scroll with header offset compensation

### Navigation Enhancement

- **Anchor Link Handling**: Prevents default browser behavior
- **Smart Positioning**: Accounts for sticky header height in scroll calculations

## 🔧 Performance Features

### Optimization Techniques

- **CSS Transitions**: Hardware-accelerated animations
- **Efficient Selectors**: Optimized CSS selector performance
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Minimal JavaScript**: Lightweight functionality without dependencies

### Browser Support

- **Modern Browsers**: Full feature support with advanced CSS
- **Legacy Support**: Fallbacks for older browser compatibility
- **Progressive Enhancement**: Enhanced experience for capable browsers

## 🎯 Key Learning Outcomes

This project demonstrates:

- **Modern CSS Layout**: Grid and Flexbox mastery
- **Accessibility Best Practices**: WCAG guidelines implementation
- **Responsive Design**: Mobile-first development approach
- **Performance Optimization**: Efficient CSS and minimal JavaScript
- **Semantic HTML**: Proper document structure and meaning
- **Advanced CSS**: Modern features with progressive enhancement

## 🚀 Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Feature Detection**: `@supports` queries for enhanced features
- **Graceful Degradation**: Fallbacks for unsupported features
- **Mobile Browsers**: Optimized for mobile Safari and Chrome

## 📋 Code Quality

- **W3C Validation**: HTML and CSS pass validation
- **Semantic Structure**: Meaningful document outline
- **Clean Code**: Well-organized, commented, and maintainable
- **Performance**: Optimized for fast loading and smooth interactions

---

_This project serves as a comprehensive demonstration of modern web development techniques, combining aesthetic design with robust functionality and accessibility._
