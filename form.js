// Live preview: copies what you type in the form into the kit.
// Each form input has a name, e.g. name="subs".
// Kit elements with data-field="subs" show its text;
// elements with data-width="age1" use it as a bar width (%).

const form = document.querySelector('#form');

// Remember the sample text, so an empty input shows it again
document.querySelectorAll('[data-field]').forEach(el => {
  el.dataset.sample = el.textContent;
});

function update() {
  // 1. Text and bar widths
  form.querySelectorAll('input[name]').forEach(input => {
    const value = input.value.trim();

    document.querySelectorAll(`[data-field="${input.name}"]`).forEach(el => {
            el.textContent = value || el.dataset.sample;
      if (el.hasAttribute('data-fade')) el.classList.toggle('is-sample', value === '');
    });

    if (value !== '') {
      document.querySelectorAll(`[data-width="${input.name}"]`).forEach(el => {
        el.style.width = Math.min(Number(value), 100) + '%';
      });
    }
  });

  // 2. Men % = 100 minus women %
  const women = form.elements.women.value;
  document.querySelector('#men').textContent = women === '' ? '00' : 100 - Number(women);

  // 3. Handles line: up to 4 rows of Platform + Handle, empty rows skipped
  const handles = [];
  for (let i = 1; i <= 4; i++) {
    const platform = form.elements['plat' + i]?.value.trim() || '';
    const handle = form.elements['handle' + i]?.value.trim() || '';
    if (handle !== '') handles.push((platform + ' ' + handle).trim());
  }

  const handlesLine = document.querySelector('#handles');
  handlesLine.dataset.sample ??= handlesLine.textContent;
  handlesLine.textContent = handles.length > 0 ? handles.join(' · ') : handlesLine.dataset.sample;
  
  // 4. Contact + "Numbers updated": when empty, show faded sample text (hidden in the PDF)
  const contact = document.querySelector('#contact');
  if (contact) {
    const parts = [form.elements.email.value.trim(), form.elements.phone.value.trim()].filter(v => v !== '');
    contact.textContent = parts.length > 0 ? parts.join(' · ') : 'you@example.com · +000 000 000 000';
    contact.classList.toggle('is-sample', parts.length === 0);
  }
  const updatedEmpty = form.elements.updated.value.trim() === '';
  document.querySelector('.updated').classList.toggle('is-sample', updatedEmpty);
}

// Run update every time anything in the form changes
form.addEventListener('input', update);

// Platform boxes: empty on click so the full suggestion list shows; put the old value back if nothing was chosen
form.querySelectorAll('input[list]').forEach(input => {
  input.addEventListener('focus', () => {
    input.dataset.old = input.value;
    input.placeholder = input.value || input.placeholder;
    input.value = '';
  });
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') input.value = input.dataset.old;
  });
});
