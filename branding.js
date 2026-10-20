// Step 6a: brand color (swatches + any color), saved in the browser
const brandKit = document.querySelector('.kit');
const colorPicker = document.getElementById('color');
const colorSwatches = document.querySelectorAll('.swatches button');
const COLOR_KEY = 'mediakit:color';

function setColor(color) {
  brandKit.style.setProperty('--accent', color);
  colorPicker.value = color;
  colorSwatches.forEach(b => b.classList.toggle('on', b.dataset.color === color));
  localStorage.setItem(COLOR_KEY, color);
}

colorSwatches.forEach(b => b.addEventListener('click', () => setColor(b.dataset.color)));
colorPicker.addEventListener('input', () => setColor(colorPicker.value));

setColor(localStorage.getItem(COLOR_KEY) || '#006aff');
