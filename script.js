document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Elements
  const card = document.querySelector('[data-testid="test-todo-card"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
  const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
  const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
  const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
  const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

  // Extract the target date from the <time datetime="..."> attribute
  const targetDateStr = dueDateEl.getAttribute('datetime');
  const targetDate = new Date(targetDateStr).getTime();

  // 2. Time Remaining Logic
  function updateTimeRemaining() {
    const now = Date.now();
    const diff = targetDate - now;

    // If marked as complete, we stop showing urgency
    if (checkbox.checked) {
      timeRemainingEl.textContent = "Task completed";
      return;
    }

    if (diff < 0) {
      const hoursOverdue = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
      timeRemainingEl.textContent = `Overdue by ${hoursOverdue} hour${hoursOverdue !== 1 ? 's' : ''}`;
    } else {
      const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      if (daysLeft > 1) {
        timeRemainingEl.textContent = `Due in ${daysLeft} days`;
      } else if (daysLeft === 1) {
        timeRemainingEl.textContent = "Due tomorrow";
      } else if (hoursLeft > 0) {
        timeRemainingEl.textContent = `Due in ${hoursLeft} hours`;
      } else {
        timeRemainingEl.textContent = "Due now!";
      }
    }
  }

  // Initial calculation
  updateTimeRemaining();
  
  // Optional: Update every 60 seconds
  setInterval(updateTimeRemaining, 60000);

  // 3. Checkbox Toggle Logic
  checkbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    
    // Toggle visual strike-through class
    card.classList.toggle('is-completed', isChecked);
    
    // Update status badge
    if (isChecked) {
      statusBadge.textContent = "Done";
      statusBadge.classList.replace('status-pending', 'status-done');
    } else {
      statusBadge.textContent = "Pending";
      statusBadge.classList.replace('status-done', 'status-pending');
    }

    // Refresh time text to either show "Completed" or recalculate urgency
    updateTimeRemaining();
  });

  // 4. Dummy Action Buttons
  editBtn.addEventListener('click', () => {
    console.log("Edit clicked");
  });

  deleteBtn.addEventListener('click', () => {
    alert("Delete clicked");
  });
});