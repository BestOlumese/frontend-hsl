# Frontend Wizards — Stage 0 & Stage 1: Stateful Todo Item Card

A clean, modern, and fully responsive Todo / Task Card component built using pure HTML, CSS, and Vanilla JavaScript. This project serves as a foundational exercise focusing strictly on semantic HTML, web accessibility (a11y), responsive design, DOM testability, and state management.

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

## 🔄 What Changed from Stage 0 (Stage 1 Updates)

* **Centralized State Management:** Migrated from direct DOM manipulation to a declarative state object pattern (`state = { title, priority, status... }`). The UI completely syncs via a single `render()` function.
* **Edit Mode:** Users can toggle an inline edit form, alter properties, and choose to save or cancel (which reliably restores previous data).
* **Two-Way Status Sync:** The checkbox and the `<select>` status dropdown are perfectly synchronized. Checking the box sets status to "Done"; selecting "Done" visually checks the box.
* **Granular Time Handling:** Time now calculates dynamically down to minutes (e.g., "Due in 45 min", "Overdue by 2h") and polls every 60 seconds without page refreshes.
* **Expand/Collapse Logic:** Descriptions over 80 characters clamp to 2 lines with an accessible "Show more/less" toggle button.

## 🎨 Design Decisions

* **Priority Indicator:** Added a persistent visual left-border accent (`.priority-accent`) that maps to the data state (Red = High, Yellow = Medium, Green = Low).
* **In Progress State:** Introduced a subtle background shift (`.is-in-progress`) to visually distinguish tasks actively being worked on from pending tasks.
* **Form Layout:** Leveraged CSS Flexbox to ensure the edit form fields align horizontally on desktop for space efficiency, while stacking cleanly on mobile widths (`< 400px`).

## ♿ Accessibility Notes

* **Focus Management (Trap/Restore):** Clicking 'Edit' traps focus to the first input field (`edit-title`). Clicking 'Save' or 'Cancel' returns focus back to the Edit button to maintain smooth, predictable keyboard flow.
* **ARIA Attributes:** The expand toggle utilizes `aria-expanded` and `aria-controls` to announce structural changes to screen readers. Live time updates are wrapped in an `aria-live="polite"` region.
* **Form Linkage:** All edit inputs have explicitly linked `<label>` tags to ensure screen readers announce input purposes correctly.

## ⚠️ Known Limitations

* State is currently stored in memory and will reset upon page reload (no `localStorage` implemented in this stage).

## 🛠️ Technologies Used

* **HTML5** (Semantic structure, aria attributes)
* **CSS3** (Flexbox, CSS Variables, Responsive design, Data-attribute styling)
* **Vanilla JavaScript** (State management, Date manipulation, DOM syncing, Event delegation)

## 📁 Project Structure

```text
├── index.html   # Markup and semantic structure
├── style.css    # Responsive styling and visual states
├── script.js    # Interactivity, time calculation, and state management
└── README.md    # Project documentation