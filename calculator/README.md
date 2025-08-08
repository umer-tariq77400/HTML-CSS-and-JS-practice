# Calculator

A simple responsive web calculator supporting basic arithmetic (+, -, ×, ÷), decimals, result recall (Ans), clear (C), delete (Del), and keyboard input.

## Features
- Basic operations: add, subtract, multiply, divide
- Decimal input with single decimal per number segment
- Ans button recalls last computed result
- Clear (C) resets everything
- Delete (Del) removes last character
- Trailing operator auto-trim before evaluation
- Keyboard support (numbers, + - * / . Enter Backspace Escape)
- Responsive layout for small screens

## Tech Stack
- HTML: structural layout
- CSS: grid-based keypad, responsive styling
- JavaScript: expression building + eval-based evaluation

## How It Works
- The current arithmetic expression is maintained as a string.
- UI buttons append or modify that string (preventing invalid sequences like double operators or duplicate decimals in a segment).
- Before evaluation:
  - Trailing operators are removed.
  - Symbols × and ÷ are mapped to * and /.
  - Expression is sanitized (only digits, operators, dots).
- Result is computed with `eval()` (safe here because input comes only from controlled buttons/keys).
- Result is stored in `lastResult` (used by Ans).

## Keyboard Shortcuts
| Key            | Action          |
|----------------|-----------------|
| 0–9            | Digit input     |
| .              | Decimal         |
| + - * /        | Operators       |
| Enter or =     | Evaluate        |
| Backspace      | Delete last     |
| Escape         | Clear (C)       |

## File Overview
- index.html: Markup and button layout
- style.css: Grid layout, button styles, responsive adjustments
- script.js: Event handlers, expression state, evaluation logic

## Constraints / Notes
- No operator precedence override beyond normal arithmetic.
- Division by zero yields "Error".
- Long numbers are trimmed to reasonable precision.

## Possible Improvements
- Add +/- sign toggle
- Memory keys (M+, M-, MR, MC)
- History panel
- Scientific functions

## Getting Started
Open `index.html` in any modern browser. No build step required.

Experiment by modifying handlers in `script.js` to deepen understanding.
