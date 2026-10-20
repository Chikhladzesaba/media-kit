// images.js — click an image box in the kit to upload, shrink and save
const MAX_SIZE = 400; // longest side in pixels
const UPLOAD_ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7 9l5-5 5 5M5 15v4h14v-4"/></svg>';

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

function showImage(box, dataUrl, fit) {
  box.innerHTML = '';
  box.classList.toggle('has-image', !!dataUrl);
  if (!dataUrl) { box.innerHTML = UPLOAD_ICON; return; }
  const img = document.createElement('img');
  img.src = dataUrl;
  img.alt = '';
  img.style.objectFit = fit;
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'img-remove';
  x.textContent = '×';
  x.title = 'Remove image';
  box.append(img, x);
}

function setupImage(o) {
  const box = document.querySelectorAll(o.box)[o.index || 0];
  if (!box) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.hidden = true;
  document.body.appendChild(input);
  box.title = 'Click to upload ' + o.label;
  showImage(box, localStorage.getItem(o.key), o.fit);

  box.addEventListener('click', (e) => {
    if (e.target.closest('.img-remove')) {
      localStorage.removeItem(o.key);
      showImage(box, null, o.fit);
      return;
    }
    input.click();
  });

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
      showImage(box, dataUrl, o.fit);
    });
  });
}

setupImage({ box: '.photo', key: 'mediakit:photo', type: 'image/png', fit: 'cover', label: 'a photo or logo' });

// Brand logos: the same setup for each of the 3 boxes (i = 0, 1, 2)
for (let i = 0; i < 6; i++) {
  setupImage({ box: '.mini-logo', index: i, key: 'mediakit:brand' + (i + 1), type: 'image/png', fit: 'cover', label: 'a brand logo' });
}
