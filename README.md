# LuxeDrive Cars — Website (Static HTML/CSS/JS)

A hand-coded, framework-free website. No build step, no platform fee — just files you upload to hosting.

## Folder structure

```
index.html
about-us.html
our-fleet.html
gwagon-hire.html
wedding-car-hire.html
airport-transfers.html
corporate-chauffeur.html
events.html
contact-us.html
blog/
  index.html
  gwagon-wedding-car.html
  airport-transfer-vs-rideshare.html
partials/
  header.html      ← edit nav/logo once, it updates on every page
  footer.html       ← edit footer once, it updates on every page
css/style.css
js/main.js
```

## Previewing locally

Because the header/footer load via `fetch()`, opening `index.html` directly by double-clicking it (`file://...`) will NOT show the nav/footer — browsers block that for security. To preview properly on your machine, run a tiny local server from the `site` folder, e.g.:

```
npx serve .
```
or, if you have Python:
```
python3 -m http.server
```
Then open `http://localhost:PORT` in your browser.

This limitation disappears once it's on real hosting — the site will work normally there.

## Hosting (instead of VIPsites)

1. In VentraIP (or wherever you host), set up **standard web hosting** for `luxedrivecars.com.au` — separate from the VIPsites builder product.
2. Upload everything inside the `site` folder to the web root (usually `public_html` or `www`) via FTP or the hosting file manager.
3. Point your domain's DNS to that hosting if it isn't already.

## What's still placeholder

Every box that says **"PHOTO: ..."** is a styled placeholder, not a real image. Replace each one with an actual `<img>` tag once you've got real photography — search each HTML file for `photo-placeholder` to find them. Example swap:

```html
<!-- before -->
<div class="photo-placeholder light"><span>PHOTO: front 3/4 exterior</span></div>

<!-- after -->
<img src="/images/g63-front.jpg" alt="2026 Mercedes-AMG G63, white exterior, front view">
```

## The enquiry form

Right now, submitting the Contact Us form only shows an on-page "Thank you" message — **it does not email anyone yet.** Plain HTML/JS can't send emails by itself. To actually receive enquiries, pick one:

- **Easiest:** sign up for a free form backend like Formspree or Web3Forms, and point the `<form>`'s `action` at the endpoint they give you (a few lines of config, no server needed).
- **Alternative:** if your hosting supports PHP, add a small server-side script that emails `info@luxedrivecars.com.au` when the form posts.

Until one of these is set up, **don't assume enquiries are reaching your inbox** — test it once it's live.

## Meta titles & descriptions

Every page already has a unique `<title>` and `<meta name="description">` in its `<head>` — this is the thing VIPsites couldn't give you per-page. To change any page's title/description for Google, just edit those two lines directly in that page's HTML file.

## Adding a new page later

1. Copy an existing page (e.g. `events.html`) as a starting point.
2. Update the `<title>`, `<meta name="description">`, `<link rel="canonical">`, and `data-page` attribute on `<body>`.
3. Add a link to it in `partials/header.html` (and `footer.html` if relevant).
