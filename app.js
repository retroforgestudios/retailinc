const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const details = new FormData(event.currentTarget);
  const brief = [
    'Retail Inc | POS project brief',
    'Business: ' + details.get('business'),
    'Store type: ' + details.get('venue'),
    'Locations: ' + details.get('locations'),
    'Project details: ' + (details.get('message') || 'To be discussed')
  ].join('\n');
  const download = document.querySelector('#brief-download');
  const previousUrl = download.getAttribute('href');
  if (previousUrl) URL.revokeObjectURL(previousUrl);
  download.href = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  document.querySelector('#brief-text').value = brief;
  document.querySelector('#brief-output').hidden = false;
  document.querySelector('#form-status').textContent = 'Your brief is ready to copy or download.';
});
