// countries.js — top 5 countries. Shows only filled rows;
// all empty = faded sample rows (hidden in the PDF).
const countriesList = document.querySelector('.countries');

function showCountries() {
  const filled = [];
  for (let i = 1; i <= 5; i++) {
    const name = form.elements['c' + i].value.trim();
    const pct = form.elements['c' + i + 'pct'].value.trim();
    filled.push(name !== '' || pct !== '');
  }
  const allEmpty = !filled.includes(true);
  countriesList.querySelectorAll('li').forEach((li, i) => {
    li.hidden = !allEmpty && !filled[i];
  });
  countriesList.classList.toggle('is-sample', allEmpty);
}

form.addEventListener('input', showCountries);
showCountries();
