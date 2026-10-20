// Step 6: brand color + layout, saved in the browser
const brandKit = document.querySelector('.kit');
const colorPicker = document.getElementById('color');
const colorSwatches = document.querySelectorAll('.swatches button');
const layoutButtons = document.querySelectorAll('.layouts button');
const COLOR_KEY = 'mediakit:color';
const LAYOUT_KEY = 'mediakit:layout';

function setColor(color) {
  brandKit.style.setProperty('--accent', color);
  colorPicker.value = color;
  colorSwatches.forEach(b => b.classList.toggle('on', b.dataset.color === color));
  localStorage.setItem(COLOR_KEY, color);
}

function setLayout(layout) {
  brandKit.classList.remove('layout-bold', 'layout-dark');
  if (layout !== 'clean') brandKit.classList.add('layout-' + layout);
  layoutButtons.forEach(b => b.classList.toggle('on', b.dataset.layout === layout));
  localStorage.setItem(LAYOUT_KEY, layout);
}

colorSwatches.forEach(b => b.addEventListener('click', () => setColor(b.dataset.color)));
colorPicker.addEventListener('input', () => setColor(colorPicker.value));
layoutButtons.forEach(b => b.addEventListener('click', () => setLayout(b.dataset.layout)));

setColor(localStorage.getItem(COLOR_KEY) || '#006aff');
setLayout(localStorage.getItem(LAYOUT_KEY) || 'clean');
