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

  // Name the PDF file after the channel, e.g. "Saba Talks - Media Kit"
  const channel = form.elements.name.value.trim();
  document.title = channel ? channel + ' - Media Kit' : 'Media Kit';
}

// Runs for the button and for Cmd+P
window.addEventListener('beforeprint', prepareForPrint);
window.addEventListener('afterprint', () => { document.title = 'Media Kit'; });

document.getElementById('download-pdf').addEventListener('click', () => window.print());
