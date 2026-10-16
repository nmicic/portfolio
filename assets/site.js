const cards = [...document.querySelectorAll('.project-grid .project-card')];
const buttons = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#project-search');
const count = document.querySelector('#visible-count');
const noResults = document.querySelector('#no-results');
let activeFilter = 'all';

function applyFilters() {
  if (!cards.length) return;
  const query = (search?.value || '').trim().toLowerCase();
  let visible = 0;
  for (const card of cards) {
    const inDomain = activeFilter === 'all' || card.dataset.domain === activeFilter;
    const inSearch = !query || card.dataset.search.includes(query);
    card.hidden = !(inDomain && inSearch);
    if (!card.hidden) visible += 1;
  }
  if (count) count.textContent = String(visible);
  if (noResults) noResults.hidden = visible !== 0;
}

for (const button of buttons) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    for (const item of buttons) {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    }
    applyFilters();
  });
}
search?.addEventListener('input', applyFilters);

const content = document.querySelector('.project-content');
const contentsNav = document.querySelector('.on-this-page nav');
if (content && contentsNav) {
  const headings = [...content.querySelectorAll('h2')];
  for (const heading of headings) {
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    contentsNav.append(link);
  }
}
