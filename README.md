# Personal Website

A clean, recruiter-friendly one-page portfolio site ready for GitHub Pages.

## What is included

- Responsive single-page website (`index.html`)
- Modern styling (`styles.css`)
- Small interaction script for mobile nav and dynamic footer year (`script.js`)

## Customize before publishing

Open `index.html` and replace these placeholders:

- `Your Name`
- `City, State`
- Experience bullets and company names
- Project descriptions
- Contact links and email
- `resume.pdf` link (add your actual resume file to the repo root)

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch), `/ (root)`
4. Save, then wait 1–2 minutes.
5. Your site will be live at:
   `https://<your-github-username>.github.io/<repo-name>/`
