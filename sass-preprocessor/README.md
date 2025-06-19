# Sass Essentials - Preprocessor Demo

A simple demonstration of Sass (Syntactically Awesome Style Sheets) preprocessor features, showing how Sass code compiles to regular CSS.

## Project Structure

```
sass-preprocessor/
├── index.html          # Main HTML page
├── styles.css          # Compiled CSS output
├── preprocessor2.scss  # Source Sass file
└── README.md          # This documentation
```

## About the Project

This project demonstrates a basic webpage about Sass essentials, showcasing key Sass preprocessor features:

- **Variables** for consistent styling
- **Mixins** for reusable code blocks
- **Nesting** for organized CSS structure
- **Functions** like `lighten()` for color manipulation

## Sass Features Demonstrated

### Variables

```scss
$primary-color: #007bff;
$font-size: 16px;
```

Used for consistent color (`#007bff`) and font size (`16px`) throughout the project.

### Mixins

```scss
@mixin rounded-corners($radius) {
  border-radius: $radius;
}
```

Reusable mixin for applying border-radius with customizable values.

### Nesting

CSS selectors are nested within parent selectors, improving code organization and readability.

### Color Functions

- `lighten($primary-color, 40%)` creates lighter background colors

## Page Content

The HTML page includes:

- **Header**: Welcome title
- **About Section**: Brief description of Sass
- **Features Section**: List of Sass capabilities (Variables, Mixins, Nesting)
- **Example Section**: Styled demonstration text
- **Footer**: Copyright information

## Styling Overview

- **Color Scheme**: Blue theme using `#007bff` as primary color
- **Typography**: Arial font family with 16px base font size
- **Layout**: Clean, simple layout with centered header and footer
- **Visual Elements**: Rounded corners and light blue backgrounds for emphasis

## How It Works

1. Write styles in `preprocessor2.scss` using Sass features
2. Compile Sass to generate `styles.css`
3. Link compiled CSS to `index.html`
4. Browser renders the styled webpage

This project serves as a practical example of how Sass enhances CSS development with more maintainable and organized code.
