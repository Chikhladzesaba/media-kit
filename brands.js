// brands.js — show 0 to 6 brand cards; add, remove last, or delete one
const START_BRANDS = 3;
const MAX_BRANDS = 6;
const addBrandBtn = document.getElementById('add-brand');
const removeBrandBtn = document.getElementById('remove-brand');
const brandsSection = document.querySelector('.brands').closest('section');
const savedCount = localStorage.getItem('mediakit:brandCount');
let brandCount = savedCount === null ? START_BRANDS : Number(savedCount);

function showBrands() {
  document.querySelectorAll('[data-brand]').forEach((el) => {
    el.hidden = Number(el.dataset.brand) > brandCount;
  });
  brandsSection.hidden = brandCount === 0;
  document.querySelector('.brands').classList.toggle('many', brandCount > 3);
  addBrandBtn.textContent = '+ Add brand (' + brandCount + '/' + MAX_BRANDS + ')';
  addBrandBtn.disabled = brandCount >= MAX_BRANDS;
  removeBrandBtn.disabled = brandCount <= 0;
  localStorage.setItem('mediakit:brandCount', brandCount);
}

// Copy brand "from" into slot "to" (name, result, logo). from = null empties the slot.
function copyBrand(from, to) {
  const f = form.elements;
  f['b' + to].value = from ? f['b' + from].value : '';
  f['b' + to + 'res'].value = from ? f['b' + from + 'res'].value : '';
  const logo = from ? localStorage.getItem('mediakit:brand' + from) : null;
  if (logo) localStorage.setItem('mediakit:brand' + to, logo);
  else localStorage.removeItem('mediakit:brand' + to);
}

// Delete brand n: shift the ones below it up by one, empty the last slot
function deleteBrand(n) {
  for (let i = n; i < brandCount; i++) copyBrand(i + 1, i);
  copyBrand(null, brandCount);
  brandCount--;
  form.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelectorAll('.mini-logo').forEach((box, i) => {
    showImage(box, localStorage.getItem('mediakit:brand' + (i + 1)), 'cover');
  });
  showBrands();
}

// A small × on each brand card in the kit
document.querySelectorAll('.card[data-brand]').forEach((card) => {
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'card-remove';
  x.textContent = '×';
  x.title = 'Delete this brand';
  x.addEventListener('click', () => deleteBrand(Number(card.dataset.brand)));
  card.appendChild(x);
});

addBrandBtn.addEventListener('click', () => { brandCount++; showBrands(); });
removeBrandBtn.addEventListener('click', () => { brandCount--; showBrands(); });
showBrands();
