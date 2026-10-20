// brands.js — show 3 to 6 brand cards, added one at a time
const MIN_BRANDS = 3;
const MAX_BRANDS = 6;
const addBrandBtn = document.getElementById('add-brand');
const removeBrandBtn = document.getElementById('remove-brand');
let brandCount = Number(localStorage.getItem('mediakit:brandCount')) || MIN_BRANDS;

function showBrands() {
  document.querySelectorAll('[data-brand]').forEach((el) => {
    el.hidden = Number(el.dataset.brand) > brandCount;
  });
  document.querySelector('.brands').classList.toggle('many', brandCount > 3);
  addBrandBtn.textContent = '+ Add brand (' + brandCount + '/' + MAX_BRANDS + ')';
  addBrandBtn.disabled = brandCount >= MAX_BRANDS;
  removeBrandBtn.disabled = brandCount <= MIN_BRANDS;
  localStorage.setItem('mediakit:brandCount', brandCount);
}

addBrandBtn.addEventListener('click', () => { brandCount++; showBrands(); });
removeBrandBtn.addEventListener('click', () => { brandCount--; showBrands(); });
showBrands();
