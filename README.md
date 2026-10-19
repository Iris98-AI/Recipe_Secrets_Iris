# Recipe Secrets — Restaurant Website

A 5-page static website for "Recipe Secrets", a modern-Asian fusion restaurant in Singapore. Plain HTML5 + CSS + vanilla JavaScript — no frameworks, no build step, no backend.

## Folder Structure

```
Recipe_Website/
├── index.html          Home
├── about.html          About (story, chef, philosophy, gallery)
├── specials.html       This week's specials (rendered from js/specials.js)
├── reservation.html    Reservation form (Formspree)
├── contact.html        Contact details, map, contact form (Formspree)
├── css/
│   └── styles.css      Shared stylesheet
├── js/
│   ├── main.js         Shared behaviour (nav, scroll reveal, form validation)
│   └── specials.js     Specials data + rendering
├── favicon.svg
└── README.md
```

All links are relative, so the site works when opened directly, hosted in a subfolder, or deployed to the domain root.

## Preview Locally

Any of these work:

- **Double-click `index.html`** to open it directly in a browser (fine for a quick look; `fetch` calls on form submit may be blocked by the `file://` origin in some browsers).
- **VS Code "Live Server" extension** — right-click `index.html` → "Open with Live Server".
- **Python's built-in server**, from inside the `Recipe_Website` folder:
  ```
  python -m http.server 8080
  ```
  Then visit `http://localhost:8080`.

## Deploy

### GitHub Pages
1. Create a new GitHub repository and push the contents of this folder to it (the repo root should contain `index.html`, `css/`, `js/`, etc.).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", choose the `main` branch and `/ (root)` folder.
4. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Drag and drop the `Recipe_Website` folder onto the Netlify dashboard ("Deploys" tab), **or** connect the GitHub repo and let Netlify auto-deploy on push.
3. No build command or publish directory overrides are needed — the site is already static (publish directory = repo root).

## Set the Formspree ID

The Reservation and Contact forms both post to Formspree placeholders:

```html
<form id="reservation-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```

To enable real submissions:

1. Create a free account at [formspree.io](https://formspree.io) and create a new form (one for Reservation, one for Contact, or reuse the same form for both).
2. Copy the form endpoint it gives you, e.g. `https://formspree.io/f/abc1234`.
3. Replace `YOUR_FORM_ID` in **both** `reservation.html` and `contact.html` with your real ID.
4. That's it — `js/main.js` already submits via `fetch()` and shows an inline "thank you" confirmation message on success (or if the request fails, so the user is never stuck). While the ID is still the placeholder `YOUR_FORM_ID`, submissions are **not** sent anywhere and only the confirmation message is shown, so you can test the UI before going live.

## Update the Specials

All specials live in a single array in `js/specials.js`. To add, remove, or edit a special, edit the `SPECIALS` array:

```js
const SPECIALS = [
  {
    name: 'Charred Miso Black Cod',
    description: 'Slow-marinated black cod with a smoky miso glaze...',
    price: '$32',
    tags: ["Chef's Pick"],
    image: 'https://images.unsplash.com/photo-....?w=1200&q=80',
    alt: 'Glazed black cod fillet plated with pickled vegetables',
  },
  // ...add more items here
];
```

Recognised tags (`Chef's Pick`, `Vegetarian`, `Spicy`) get special colour styling automatically; any other tag text still displays as a plain tag. The page re-renders the grid from this array on load — no HTML editing required.

## Notes / Placeholders to Replace

- **Business details** (address, phone, email, hours) are placeholders — update them in the footer of every page, in `contact.html`, and in the Google Maps `<iframe>` `src` in `contact.html`.
- **Social links** in `contact.html` point to generic Instagram/Facebook/Twitter homepages — replace with your real profile URLs.
- **Images** are sourced from Unsplash via direct URLs (`images.unsplash.com`) for demo purposes; swap in your own licensed restaurant photography before going live.
