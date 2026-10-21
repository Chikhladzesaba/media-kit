// stats.js — show 1 to 6 audience tiles; add, remove last, or delete one
const START_STATS = 4;
const MAX_STATS = 6;
// Tile n: number input = STAT_NUMS[n-1], label input = 'lab' + n
const STAT_NUMS = ['subs', 'avgviews', 'monthly', 'engagement', 'stat5', 'stat6'];
const addStatBtn = document.getElementById('add-stat');
const removeStatBtn = document.getElementById('remove-stat');
const statsBox = document.querySelector('.stats');
const savedStats = localStorage.getItem('mediakit:statCount');
let statCount = savedStats === null ? START_STATS : Number(savedStats);

function showStats() {
  document.querySelectorAll('[data-stat]').forEach((el) => {
    el.hidden = Number(el.dataset.stat) > statCount;
  });
  statsBox.style.setProperty('--n', statCount);
  statsBox.classList.toggle('many', statCount > 4);
  statsBox.classList.toggle('single', statCount === 1);
  addStatBtn.textContent = '+ Add tile (' + statCount + '/' + MAX_STATS + ')';
  addStatBtn.disabled = statCount >= MAX_STATS;
  removeStatBtn.disabled = statCount <= 1;
  localStorage.setItem('mediakit:statCount', statCount);
}

// Copy tile "from" into slot "to" (number + label). from = null empties the slot.
function copyStat(from, to) {
  const f = form.elements;
  f[STAT_NUMS[to - 1]].value = from ? f[STAT_NUMS[from - 1]].value : '';
  f['lab' + to].value = from ? f['lab' + from].value : '';
}

// Delete tile n: shift the ones after it back by one, empty the last slot
function deleteStat(n) {
  if (statCount <= 1) return;
  for (let i = n; i < statCount; i++) copyStat(i + 1, i);
  copyStat(null, statCount);
  statCount--;
  form.dispatchEvent(new Event('input', { bubbles: true }));
  showStats();
}

// A small × on each tile in the kit
document.querySelectorAll('.stat[data-stat]').forEach((tile) => {
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'card-remove';
  x.textContent = '×';
  x.title = 'Delete this tile';
  x.addEventListener('click', () => deleteStat(Number(tile.dataset.stat)));
  tile.appendChild(x);
});

addStatBtn.addEventListener('click', () => { statCount++; showStats(); });
removeStatBtn.addEventListener('click', () => { statCount--; showStats(); });
showStats();
