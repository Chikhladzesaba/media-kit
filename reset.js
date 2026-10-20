// Clear all: deletes only Media Kit data (Show Ledger shares this storage)
document.getElementById('reset').addEventListener('click', function () {
  var ok = confirm('Clear everything in your media kit? Text, images and brands will be deleted. This can\'t be undone.');
  if (!ok) return;
  form.reset();
  Object.keys(localStorage)
    .filter(function (key) { return key.indexOf('mediakit:') === 0; })
    .forEach(function (key) { localStorage.removeItem(key); });
  location.reload();
});
