// images.js — upload, shrink and save images (step 5)
const MAX_SIZE = 400; // longest side in pixels

function shrinkImage(file, type, done) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      done(canvas.toDataURL(type, 0.85));
    };
    img.onerror = () => alert('This file could not be read as an image.');
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function showImage(box, dataUrl, placeholder, fit) {
  box.textContent = '';
  if (!dataUrl) { box.textContent = placeholder; return; }
  const img = document.createElement('img');
  img.src = dataUrl;
  img.alt = '';
  img.style.cssText = 'width:100%;height:100%;border-radius:inherit;display:block;object-fit:' + (fit || 'cover');
  box.appendChild(img);
}

function setupImage(o) {
  const input = document.getElementById(o.input);
  const remove = document.getElementById(o.remove);
  const box = document.querySelector(o.box);
  showImage(box, localStorage.getItem(o.key), o.placeholder, o.fit);

  input.addEventListener('change', () => {
    const file = input.files[0];
    input.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please choose an image file (JPG or PNG).'); return; }
    shrinkImage(file, o.type, (dataUrl) => {
      try {
        localStorage.setItem(o.key, dataUrl);
      } catch (e) {
        alert('Not enough browser storage to save this image. Try a smaller one.');
        return;
      }
      showImage(box, dataUrl, o.placeholder, o.fit);
    });
  });

  remove.addEventListener('click', () => {
    localStorage.removeItem(o.key);
    showImage(box, null, o.placeholder, o.fit);
  });
}

setupImage({
  input: 'photo-input',
  remove: 'photo-remove',
  box: '.photo',
  key: 'mediakit:photo',
  type: 'image/jpeg',
  placeholder: 'Photo'
});

setupImage({
  input: 'logo-input',
  remove: 'logo-remove',
  box: '.logo',
  key: 'mediakit:logo',
  type: 'image/png',
  fit: 'contain',
  placeholder: 'Logo'
});
