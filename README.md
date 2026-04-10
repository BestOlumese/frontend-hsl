# Frontend Wizards — Stage 0: Testable Todo Item Card

A clean, modern, and fully responsive Todo / Task Card component built using pure HTML, CSS, and Vanilla JavaScript. This project serves as a foundational exercise focusing strictly on semantic HTML, web accessibility (a11y), responsive design, and DOM testability.

## 🚀 Features

* **Semantic HTML:** Built with meaningful native elements (`<article>`, `<header>`, `<time>`) to ensure proper document structure.
* **Fully Accessible (a11y):** * WCAG AA compliant color contrast.
  * Visible focus states for keyboard navigation.
  * ARIA labels (`aria-label`, `aria-live`) implemented for screen readers.
  * Fully navigable using the `Tab` key.
* **Test-Ready:** Every interactive and structural element includes exact `data-testid` attributes required for automated E2E testing (e.g., Cypress or Playwright).
* **Responsive Design:** Adapts fluidly from mobile screens (320px) to desktop (1200px) using CSS Flexbox.
* **Dynamic Time Remaining:** Automatically calculates and displays the time remaining until the due date (e.g., "Due in 3 days", "Overdue by 2 hours").
* **Zero Dependencies:** No external libraries or frameworks. Just vanilla web technologies.

## 🛠️ Technologies Used

* **HTML5** (Semantic structure)
* **CSS3** (Flexbox, CSS Variables, Responsive design)
* **Vanilla JavaScript** (Date manipulation, DOM updates, Event handling)

## 📁 Project Structure

```text
├── index.html   # Markup and semantic structure
├── style.css    # Responsive styling and themes
├── script.js    # Interactivity and time calculation
└── README.md    # Project documentation