const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const addBtn = document.getElementById("add-note");
const message = document.getElementById("message");
const notesContainer = document.getElementById("notes-container");
const toggleDark = document.getElementById("toggle-dark");

let editIndex = null;

// Get notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

// Save notes to localStorage
function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Get current time with day
function getCurrentTimestamp() {
  const now = new Date();
  return `${now.toLocaleString()} (${now.toLocaleDateString('en-US', { weekday: 'long' })})`;
}

// Show success message
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => (message.textContent = ""), 2000);
}

// Show all notes
function showNotes() {
  const notes = getNotes();
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.desc}</p>
      <small><i>${note.time}</i></small><br/>
      <button class="edit-btn" onclick="editNote(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

// Add / Update Note
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  if (!title || !desc) {
    alert("Title aur Description likhna zaroori hai!");
    return;
  }

  const notes = getNotes();

  if (editIndex !== null) {
    notes[editIndex] = { title, desc, time: getCurrentTimestamp() };
    showMessage("Note updated successfully ✅");
    editIndex = null;
  } else {
    notes.push({ title, desc, time: getCurrentTimestamp() });
    showMessage("Note added successfully ✅");
  }

  saveNotes(notes);
  titleInput.value = "";
  descInput.value = "";
  showNotes();
});

// Delete note
function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  showNotes();
  showMessage("Note deleted ❌");
}

// Edit note
function editNote(index) {
  const note = getNotes()[index];
  titleInput.value = note.title;
  descInput.value = note.desc;
  editIndex = index;
  showMessage("Editing note ✏️");
}

// Toggle dark mode
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial load
showNotes();
