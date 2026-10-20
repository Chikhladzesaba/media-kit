// Saving: keeps the form in this browser's localStorage,
// so a refresh doesn't empty it. Nothing leaves the computer.

// Our own key name, because Show Ledger shares this storage
const STORAGE_KEY = 'mediakit:data';

function saveForm() {
  const data = {};
  form.querySelectorAll('input[name]').forEach(input => {
    data[input.name] = input.value;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Could not save the form:', error);
  }
}

function loadForm() {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    console.warn('Could not load saved data:', error);
  }
  form.querySelectorAll('input[name]').forEach(input => {
    if (data[input.name] !== undefined) input.value = data[input.name];
  });
  update(); // show the saved values in the kit
}

form.addEventListener('input', saveForm);
loadForm();
