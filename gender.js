// gender.js — Women / Men rows, same style as the age chart.
// Both numbers are typed from the platform; nothing is calculated.
// Empty row hides; both empty = faded sample (hidden in the PDF).
const genderBox = document.querySelector('.genders');
const SAMPLE_GENDER = { women: 45, men: 55 }; // bar shapes only, never shown as numbers

function showGender() {
  const v = { women: form.elements.women.value.trim(), men: form.elements.men.value.trim() };
  const allEmpty = v.women === '' && v.men === '';
  const num = (k) => (allEmpty ? SAMPLE_GENDER[k] : Number(v[k]) || 0);
  const max = Math.max(num('women'), num('men'), 1);

  genderBox.querySelectorAll('[data-gender]').forEach((row) => {
    const k = row.dataset.gender;
    row.hidden = !allEmpty && v[k] === '';
    row.querySelector('i').style.width = (num(k) / max) * 100 + '%';
    row.querySelector('b').textContent = allEmpty ? '00%' : v[k] + '%';
  });
  genderBox.classList.toggle('is-sample', allEmpty);
}

form.addEventListener('input', showGender);
showGender();
