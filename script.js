document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DOM Element Caching ---
  const card = document.querySelector('[data-testid="test-todo-card"]');
  const viewMode = document.getElementById('view-mode');
  const editMode = document.getElementById('edit-mode');
  
  // View Elements
  const titleEl = document.querySelector('[data-testid="test-todo-title"]');
  const descEl = document.querySelector('[data-testid="test-todo-description"]');
  const priorityBadge = document.querySelector('[data-testid="test-todo-priority"]');
  const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
  const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
  const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
  
  const statusSelect = document.querySelector('[data-testid="test-todo-status-control"]');
  const statusDisplay = document.querySelector('[data-testid="test-todo-status"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  
  const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');
  const descSection = document.querySelector('[data-testid="test-todo-collapsible-section"]');
  
  // Form Elements
  const editTitle = document.querySelector('[data-testid="test-todo-edit-title-input"]');
  const editDesc = document.querySelector('[data-testid="test-todo-edit-description-input"]');
  const editPriority = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
  const editDueDate = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
  
  // Buttons
  const btnEdit = document.querySelector('[data-testid="test-todo-edit-button"]');
  const btnCancel = document.querySelector('[data-testid="test-todo-cancel-button"]');


  // --- 2. Setup Initial UI Logic ---

  // Hide the "Show more" button if description is short
  if (descEl.textContent.length < 80) {
    expandToggle.style.display = 'none';
    descSection.classList.remove('collapsed');
  }


  // --- 3. Core Functions ---

  // Calculates and displays the time directly based on the HTML attribute
  function updateTimeUI() {
    // Read the date directly from the HTML element
    const targetDateStr = dueDateEl.getAttribute('datetime');
    const targetDate = new Date(targetDateStr).getTime();
    const now = Date.now();
    const diff = targetDate - now;

    // Check current status directly from the dropdown
    if (statusSelect.value === "Done") {
      timeRemainingEl.textContent = "Completed";
      card.classList.remove('is-overdue');
      overdueIndicator.classList.add('hidden');
      return;
    }

    if (diff < 0) {
      card.classList.add('is-overdue');
      overdueIndicator.classList.remove('hidden');
      const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
      const mins = Math.floor((Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60));
      timeRemainingEl.textContent = hours > 0 ? `Overdue by ${hours}h` : `Overdue by ${mins}m`;
    } else {
      card.classList.remove('is-overdue');
      overdueIndicator.classList.add('hidden');
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) timeRemainingEl.textContent = `Due in ${days} day${days > 1 ? 's' : ''}`;
      else if (hours > 0) timeRemainingEl.textContent = `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
      else timeRemainingEl.textContent = `Due in ${mins} min${mins > 1 ? 's' : ''}`;
    }
  }

  // Updates all status-related visual elements at once
  function syncStatusUI(newStatus) {
    statusSelect.value = newStatus;
    statusDisplay.textContent = newStatus;
    checkbox.checked = (newStatus === "Done");

    card.classList.toggle('is-completed', newStatus === "Done");
    card.classList.toggle('is-in-progress', newStatus === "In Progress");

    updateTimeUI(); // Refresh time to show "Completed" or resume countdown
  }


  // --- 4. Event Listeners ---

  // Start Time Loop
  updateTimeUI();
  setInterval(updateTimeUI, 60000);

  // Status Changes
  statusSelect.addEventListener('change', (e) => {
    syncStatusUI(e.target.value);
  });

  checkbox.addEventListener('change', (e) => {
    const newStatus = e.target.checked ? "Done" : "Pending";
    syncStatusUI(newStatus);
  });

  // Expand / Collapse
  expandToggle.addEventListener('click', () => {
    const isCurrentlyCollapsed = descSection.classList.contains('collapsed');
    
    if (isCurrentlyCollapsed) {
      descSection.classList.remove('collapsed');
      expandToggle.textContent = "Show less";
      expandToggle.setAttribute('aria-expanded', 'true');
    } else {
      descSection.classList.add('collapsed');
      expandToggle.textContent = "Show more";
      expandToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Enter Edit Mode
  btnEdit.addEventListener('click', () => {
    // 1. Copy current view data into form inputs
    editTitle.value = titleEl.textContent;
    editDesc.value = descEl.textContent;
    editPriority.value = priorityBadge.textContent;
    editDueDate.value = dueDateEl.getAttribute('datetime');

    // 2. Switch visibility
    viewMode.classList.add('hidden');
    editMode.classList.remove('hidden');
    editMode.setAttribute('aria-hidden', 'false');

    // 3. Focus input
    editTitle.focus();
  });

  // Cancel Edit Mode
  btnCancel.addEventListener('click', () => {
    viewMode.classList.remove('hidden');
    editMode.classList.add('hidden');
    editMode.setAttribute('aria-hidden', 'true');
    btnEdit.focus();
  });

  // Save Edit Form
  editMode.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Copy form data back to view elements
    titleEl.textContent = editTitle.value.trim();
    descEl.textContent = editDesc.value.trim();
    priorityBadge.textContent = editPriority.value;
    
    // Format and set the new date
    const dateObj = new Date(editDueDate.value);
    dueDateEl.setAttribute('datetime', editDueDate.value);
    dueDateEl.textContent = `Due ${dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    
    // Update visual priority accent
    card.setAttribute('data-priority', editPriority.value);

    // 2. Check if expand/collapse button should be hidden based on new length
    if (editDesc.value.trim().length < 80) {
      expandToggle.style.display = 'none';
      descSection.classList.remove('collapsed');
    } else {
      expandToggle.style.display = 'inline-block';
      descSection.classList.add('collapsed');
      expandToggle.textContent = "Show more";
    }

    // 3. Switch visibility back to view mode
    viewMode.classList.remove('hidden');
    editMode.classList.add('hidden');
    editMode.setAttribute('aria-hidden', 'true');
    
    // 4. Update the countdown and restore focus
    updateTimeUI();
    btnEdit.focus();
  });

});