// packages.js — show 1 to 4 package cards; add, remove last, or delete one
const START_PACKAGES = 3;
const MAX_PACKAGES = 4;
const PKG_FIELDS = ['name', 'price', 'inc']; // inputs p1name, p1price, p1inc ...
const addPkgBtn = document.getElementById('add-package');
const removePkgBtn = document.getElementById('remove-package');
const pkgBox = document.querySelector('.packages');
const savedPkgs = localStorage.getItem('mediakit:packageCount');
let pkgCount = savedPkgs === null ? START_PACKAGES : Number(savedPkgs);

function showPackages() {
  document.querySelectorAll('[data-package]').forEach((el) => {
    el.hidden = Number(el.dataset.package) > pkgCount;
  });
  pkgBox.style.setProperty('--n', pkgCount);
  pkgBox.classList.toggle('single', pkgCount === 1);
  addPkgBtn.textContent = '+ Add package (' + pkgCount + '/' + MAX_PACKAGES + ')';
  addPkgBtn.disabled = pkgCount >= MAX_PACKAGES;
  removePkgBtn.disabled = pkgCount <= 1;
  localStorage.setItem('mediakit:packageCount', pkgCount);
}

// Copy package "from" into slot "to". from = null empties the slot.
function copyPackage(from, to) {
  const f = form.elements;
  PKG_FIELDS.forEach((k) => {
    f['p' + to + k].value = from ? f['p' + from + k].value : '';
  });
}

// Delete package n: shift the ones after it back by one, empty the last slot
function deletePackage(n) {
  if (pkgCount <= 1) return;
  for (let i = n; i < pkgCount; i++) copyPackage(i + 1, i);
  copyPackage(null, pkgCount);
  pkgCount--;
  form.dispatchEvent(new Event('input', { bubbles: true }));
  showPackages();
}

// A small × on each package card in the kit
document.querySelectorAll('.package[data-package]').forEach((card) => {
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'card-remove';
  x.textContent = '×';
  x.title = 'Delete this package';
  x.addEventListener('click', () => deletePackage(Number(card.dataset.package)));
  card.appendChild(x);
});

addPkgBtn.addEventListener('click', () => { pkgCount++; showPackages(); });
removePkgBtn.addEventListener('click', () => { pkgCount--; showPackages(); });
showPackages();
