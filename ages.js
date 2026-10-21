// ages.js — age chart with the 7 YouTube/Instagram groups.
// Shows only filled rows; the biggest group gets the full bar.
// All empty = faded sample (hidden in the PDF).
// TikTok stops at 55+: if 65+ is empty, the 55–64 row reads "55+".
const SAMPLE_AGES = [2, 15, 35, 28, 12, 5, 3]; // bar shapes only, never shown as numbers
const agesBox = document.querySelector('.ages');

function showAges() {
  const values = [];
  for (let i = 0; i <= 6; i++) values.push(form.elements['age' + i].value.trim());
  const allEmpty = values.every((v) => v === '');
  const nums = values.map((v, i) => (allEmpty ? SAMPLE_AGES[i] : Number(v) || 0));
  const max = Math.max(...nums, 1);

  agesBox.querySelectorAll('[data-age]').forEach((row) => {
    const i = Number(row.dataset.age);
    row.hidden = !allEmpty && values[i] === '';
    row.querySelector('i').style.width = (nums[i] / max) * 100 + '%';
    row.querySelector('b').textContent = allEmpty ? '00%' : values[i] + '%';
  });

  const tikTok = values[6] === '' && values[5] !== '';
  agesBox.querySelector('[data-age="5"] span').textContent = tikTok ? '55+' : '55–64';
  agesBox.classList.toggle('is-sample', allEmpty);
}

form.addEventListener('input', showAges);
showAges();
