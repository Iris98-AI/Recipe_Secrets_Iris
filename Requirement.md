# Website Build Prompt: Recipe Secrets Restaurant

Build a website for **"Recipe Secrets"**, a restaurant. *[One line about the restaurant: cuisine, vibe, location — e.g. "a cozy modern-Asian fusion restaurant in Singapore."]*

## Tech Constraints

- Plain **HTML5 + CSS + a little vanilla JavaScript**. No frameworks, no build step, no backend.
- It must deploy as-is to a free static host (**GitHub Pages** or **Netlify**) by uploading the folder.
- Use one shared stylesheet (`css/styles.css`) and one script (`js/main.js`). Keep the header/nav and footer identical on every page.
- Use relative links so it works from any subfolder.

## Pages (exactly 5)

1. **`index.html` (Home)**
   - Full-screen hero image with the restaurant name, a tagline, and two buttons: "Reserve a Table" and "See Specials"
   - A short intro
   - 3 featured dishes as image cards
   - A customer testimonials strip
   - Opening hours and a location teaser

2. **`about.html` (About)**
   - Our story
   - The chef (photo + bio)
   - Our philosophy and ingredients
   - An image gallery of 6–8 photos of the interior and food

3. **`specials.html` (Specials)**
   - This week's specials as image cards: name, short description, price, and tags (e.g. "Chef's pick", "Vegetarian")
   - Store the specials in **one JS array or JSON file** so they're easy to update

4. **`reservation.html` (Reservation)**
   - A form with name, email, phone, date, time, party size (1–12), and special requests
   - Client-side validation (required fields, no past dates)
   - Submit through **Formspree** (leave a clearly marked placeholder for the form ID)
   - Show a friendly confirmation message after submitting

5. **`contact.html` (Contact)**
   - Address, phone, email, and an opening hours table
   - An embedded Google Map (iframe)
   - A simple contact form (also via Formspree)
   - Social media icons

## Design

- **Style:** warm, elegant, and appetizing, like a modern upscale restaurant. Large food photography, generous whitespace, and subtle animations (fade-in on scroll, image zoom on hover).
- **Colours:** *[e.g. deep charcoal, warm cream, and a gold/terracotta accent]*. Define them as CSS variables.
- **Fonts (Google Fonts):** an elegant serif for headings (e.g. *Playfair Display*) and a clean sans-serif for body text (e.g. *Inter*).
- A **sticky header** with logo text and nav. Highlight the active page. Use a **hamburger menu** on mobile.
- **Fully responsive** (mobile-first), tested at 375px, 768px, and 1440px widths.

## Images

- Use high-quality free images from **Unsplash** (direct `images.unsplash.com` URLs with sizing params such as `?w=1600&q=80`) that match each section: dishes, restaurant interior, chef, ingredients.
- Every image needs descriptive `alt` text, `loading="lazy"` (except the hero), and `object-fit: cover` so cards line up neatly.
- Put a dark gradient overlay on the hero so the text stays readable.

## Quality

- Semantic HTML, accessible contrast, a keyboard-navigable menu, and focus states.
- A meta description and `<title>` on every page, plus a favicon.
- No console errors and no broken links.

## Deliverables

- The full folder structure and all files.
- A short `README.md` covering:
  - How to preview the site locally
  - How to deploy to GitHub Pages or Netlify
  - How to set the Formspree ID
  - How to update the specials

## Placeholder Business Details

*(I'll replace these later.)*

| Field   | Value |
|---------|-------|
| Address | [..]  |
| Phone   | [..]  |
| Email   | [..]  |
| Hours   | [..]  |
