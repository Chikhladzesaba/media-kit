// brands.js — show 0 to 6 brand cards, added one at a time
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

addBrandBtn.addEventListener('click', () => { brandCount++; showBrands(); });
removeBrandBtn.addEventListener('click', () => { brandCount--; showBrands(); });
showBrands();
