/* ===========================================================
   Recipe Secrets — This Week's Specials
   Edit this array to update the Specials page. Each object needs:
   name, description, price, tags (array), image (Unsplash URL), alt.
   Tags recognised for styling: "Chef's Pick", "Vegetarian", "Spicy".
   =========================================================== */

const SPECIALS = [
  {
    name: 'Charred Miso Black Cod',
    description: 'Slow-marinated black cod with a smoky miso glaze, pickled daikon, and crisp shallots.',
    price: '$32',
    tags: ["Chef's Pick"],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80',
    alt: 'Glazed black cod fillet plated with pickled vegetables',
  },
  {
    name: 'Truffle Mushroom Dumplings',
    description: 'Hand-folded dumplings filled with wild mushrooms and black truffle, served with chili oil.',
    price: '$18',
    tags: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=1200&q=80',
    alt: 'Steamed dumplings on a dark plate with chili oil',
  },
  {
    name: 'Szechuan Short Rib',
    description: 'Braised short rib in a numbing Szechuan pepper broth with charred scallions.',
    price: '$36',
    tags: ['Spicy'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
    alt: 'Braised short rib in a spiced broth garnished with scallions',
  },
  {
    name: 'Charcoal Grilled Eggplant',
    description: 'Smoked eggplant with miso-tahini dressing, crispy shallots, and toasted sesame.',
    price: '$16',
    tags: ['Vegetarian', "Chef's Pick"],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80',
    alt: 'Grilled eggplant halves drizzled with sesame dressing',
  },
  {
    name: 'Lobster Laksa',
    description: 'Half lobster in a rich coconut laksa broth with rice noodles and sambal.',
    price: '$42',
    tags: ["Chef's Pick", 'Spicy'],
    image: 'https://images.unsplash.com/photo-1569058242252-623df46b5025?w=1200&q=80',
    alt: 'Bowl of laksa noodle soup with lobster and herbs',
  },
  {
    name: 'Yuzu Burnt Cheesecake',
    description: 'Caramelised Basque-style cheesecake with a bright yuzu curd and candied ginger.',
    price: '$14',
    tags: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=1200&q=80',
    alt: 'Slice of burnt cheesecake topped with citrus curd',
  },
];

function tagClass(tag) {
  const normalized = tag.toLowerCase();
  if (normalized.includes('chef')) return 'tag tag-chef';
  if (normalized.includes('veg')) return 'tag tag-veg';
  if (normalized.includes('spicy')) return 'tag tag-spicy';
  return 'tag';
}

function renderSpecials() {
  const grid = document.getElementById('specials-grid');
  if (!grid) return;

  grid.innerHTML = SPECIALS.map((item, index) => `
    <article class="card reveal" style="transition-delay:${(index % 3) * 0.1}s">
      <div class="card-img-wrap">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="card-price">${item.price}</span>
        <div class="tag-list">
          ${item.tags.map((tag) => `<span class="${tagClass(tag)}">${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  // Re-run scroll reveal for newly injected cards
  const revealEls = grid.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', renderSpecials);
