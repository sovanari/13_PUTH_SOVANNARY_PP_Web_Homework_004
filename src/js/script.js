// ── DATA 
let tasks = [
  { id: 1, name: 'Java Homework',   priority: 'High',   status: 'Progress' },
  { id: 2, name: 'Korean Homework', priority: 'Medium', status: 'Progress' },
  { id: 3, name: 'Java Project',    priority: 'Low',    status: 'Progress' },
];

let nextId     = 4;    
let editingId  = null; // 
let deletingId = null; // 

// Default Priority and Status 
let selectedPriority = 'Medium';
let selectedStatus   = 'To Do';

// Text color for priority l
const priorityColor = {
  High:   'text-red-500',
  Medium: 'text-yellow-500',
  Low:    'text-green-500',
};


// ── RENDER
function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(function(task) {
    const row = document.createElement('div');
    row.className = 'bg-white rounded-2xl px-8 py-5 grid grid-cols-4 items-center shadow-sm';

    row.innerHTML =
      '<span class="font-bold text-black text-lg">' + task.name + '</span>' +
      '<span class="font-bold text-lg ' + priorityColor[task.priority] + '">' + task.priority + '</span>' +
      '<span class="font-bold text-black text-lg">' + task.status + '</span>' +
      '<div class="flex gap-3 justify-end">' +

        '<button onclick="openEditModal(' + task.id + ')" class="btn-edit text-indigo-700 p-1">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>' +
          '</svg>' +
        '</button>' +

        '<button onclick="openDeleteModal(' + task.id + ')" class="btn-delete text-red-600 p-1">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>' +
          '</svg>' +
        '</button>' +

      '</div>';

    list.appendChild(row);
  });
}


// ── MODALS 
function openAddModal() {
  editingId = null;

  document.getElementById('taskInput').value        = '';
  document.getElementById('modalTitle').textContent = 'Add Task';
  document.getElementById('actionBtn').textContent  = 'Add';
  document.getElementById('cancelBtn').classList.add('hidden');

  // Reset to defaults
  selectedPriority = 'Medium';
  selectedStatus   = 'To Do';

  updateButtonColors();
  document.getElementById('modal').classList.remove('hidden');
}

function openEditModal(id) {
  editingId = id;

  const task = tasks.find(function(t) { return t.id === id; });

  document.getElementById('taskInput').value        = task.name;
  document.getElementById('modalTitle').textContent = 'Edit Task';
  document.getElementById('actionBtn').textContent  = 'Update';
  document.getElementById('cancelBtn').classList.remove('hidden');

  selectedPriority = task.priority;
  selectedStatus   = task.status;

  updateButtonColors();
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}


// ── PRIORITY / STATUS SELECTION
function selectPriority(value) {
  selectedPriority = value;
  updateButtonColors();
}

function selectStatus(value) {
  selectedStatus = value;
  updateButtonColors();
}

// color style
function updateButtonColors() {

  const filledPriority = {
    High:   'bg-red-500    text-white border-red-500',
    Medium: 'bg-yellow-400 text-white border-yellow-400',
    Low:    'bg-green-400  text-white border-green-400',
  };
  const outlinePriority = {
    High:   'border-red-400    text-red-500    hover:bg-red-100',
    Medium: 'border-yellow-400 text-yellow-500 hover:bg-yellow-100',
    Low:    'border-green-400  text-green-500  hover:bg-green-100',
  };

  document.querySelectorAll('.priority-btn').forEach(function(btn) {
    const value = btn.dataset.p;
    btn.className = 'priority-btn border-2 font-bold px-5 py-2 rounded-xl transition ' +
      (value === selectedPriority ? filledPriority[value] : outlinePriority[value]);
  });

  document.querySelectorAll('.status-btn').forEach(function(btn) {
    const value = btn.dataset.s;
    btn.className = 'status-btn border-2 font-bold px-5 py-2 rounded-xl transition ' +
      (value === selectedStatus
        ? 'bg-cyan-400 text-white border-cyan-400'
        : 'border-cyan-400 text-cyan-500 hover:bg-cyan-100');
  });
}


// ── SAVE (Add or Update) 
function handleAction() {
  const name = document.getElementById('taskInput').value.trim();

  if (!name) {
    alert('Please enter a task name.');
    return;
  }

  if (editingId !== null) {
    // Update existing task
    const task = tasks.find(function(t) { return t.id === editingId; });
    task.name     = name;
    task.priority = selectedPriority;
    task.status   = selectedStatus;
  } else {
    // Add new task
    tasks.push({ id: nextId, name: name, priority: selectedPriority, status: selectedStatus });
    nextId = nextId + 1;
  }

  closeModal();
  render();
}


// ── DELETE 
function openDeleteModal(id) {
  deletingId = id;
  document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.add('hidden');
}

function confirmDelete() {
  tasks = tasks.filter(function(t) { return t.id !== deletingId; });
  closeDeleteModal();
  render();
}


// Start
render();