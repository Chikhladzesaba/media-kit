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

  // 3. Handles line: only the platforms that are filled in
  const handles = [
    ['YouTube', form.elements.youtube.value.trim()],
    ['Instagram', form.elements.instagram.value.trim()],
    ['TikTok', form.elements.tiktok.value.trim()],
  ]
    .filter(([, handle]) => handle !== '')
    .map(([platform, handle]) => `${platform} ${handle}`);

  const handlesLine = document.querySelector('#handles');
  handlesLine.dataset.sample ??= handlesLine.textContent;
  handlesLine.textContent = handles.length > 0 ? handles.join(' · ') : handlesLine.dataset.sample;
}

// Run update every time anything in the form changes
form.addEventListener('input', update);
