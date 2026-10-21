// download.js — "Download PDF" opens the browser's print window,
// where the creator chooses "Save as PDF". print.css decides what prints.

function prepareForPrint() {
  // Brand cards with no name stay out of the PDF
  document.querySelectorAll('.card[data-brand]').forEach((card) => {
    const name = form.elements['b' + card.dataset.brand].value.trim();
    card.classList.toggle('print-hide', name === '');
  });
  // If every brand card is empty, leave out the whole section
  const brands = document.querySelector('.brands');
  const anyBrand = brands.querySelector('.card[data-brand]:not([hidden]):not(.print-hide)');
  brands.closest('section').classList.toggle('print-hide', !anyBrand);

  fitToOnePage();

  // Name the PDF file after the channel, e.g. "Saba Talks - Media Kit"
  const channel = form.elements.name.value.trim();
  document.title = channel ? channel + ' - Media Kit' : 'Media Kit';
}

// If the kit is taller than one A4 page, shrink it just enough to fit.
// Measured on screen, where faded samples still show, so it errs on the safe side.
function fitToOnePage() {
  const kit = document.querySelector('.kit');
  kit.style.removeProperty('--fit');
  const box = kit.getBoundingClientRect();
  const screenZoom = box.width / kit.offsetWidth || 1;            // phones show the kit smaller
  const mm = kit.offsetWidth / 210;                                // CSS pixels per mm
  let bottom = 0;
  for (const el of kit.children) bottom = Math.max(bottom, el.getBoundingClientRect().bottom);
  const height = (bottom - box.top) / screenZoom + 14 * mm;        // content + bottom padding
  const fit = Math.min(1, (297 * mm) / height);
  if (fit < 1) kit.style.setProperty('--fit', Math.max(fit, 0.75).toFixed(3));
}

// Runs for the button and for Cmd+P
window.addEventListener('beforeprint', prepareForPrint);
window.addEventListener('afterprint', () => {
  document.title = 'Media Kit';
  document.querySelector('.kit').style.removeProperty('--fit');
});

document.getElementById('download-pdf').addEventListener('click', () => window.print());
