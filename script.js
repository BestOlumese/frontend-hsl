document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector('[data-testid="test-todo-card"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
  const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
  const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
  const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
  const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

  // grab the date from the time element
  const targetDateStr = dueDateEl.getAttribute('datetime');
  const targetDate = new Date(targetDateStr).getTime();

  const updateTime = () => {
    const now = Date.now();
    const diff = targetDate - now;

    // stop showing urgency if it's already done
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
  };

  // run once on load
  updateTime();
  
  // refresh every minute
  setInterval(updateTime, 60000);

  // handle the checkbox toggle
  checkbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    
    card.classList.toggle('is-completed', isChecked);
    
    if (isChecked) {
      statusBadge.textContent = "Done";
      statusBadge.classList.replace('status-pending', 'status-done');
    } else {
      statusBadge.textContent = "Pending";
      statusBadge.classList.replace('status-done', 'status-pending');
    }

    updateTime();
  });

  // dummy click handlers for the buttons
  editBtn.addEventListener('click', () => console.log("edit clicked"));
  deleteBtn.addEventListener('click', () => alert("Delete clicked"));
});