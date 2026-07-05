# Wiz Kidz Blog — Jekyll theme

A lightweight, email-friendly Jekyll theme for **blog.wizkidz.ai**, styled with the
Wiz Kidz Design System (Peacock teal + Orchid magenta, Outfit + Nunito).

## Deploy on GitHub Pages

1. Create a repo named **`blog`** under `github.com/wizkidzai` (or use `wizkidzai.github.io`).
2. Copy everything in this folder to the repo root and push.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / root.
4. DNS: add a **CNAME record** for `blog.wizkidz.ai` pointing to `wizkidzai.github.io`.
   The `CNAME` file in this repo tells GitHub Pages to serve that domain.
   In Settings → Pages, enable **Enforce HTTPS** once the cert is issued.

## Run locally

```
bundle install
bundle exec jekyll serve
```

## Writing a post

Copy `_posts/2026-07-05-post-template.md`, rename it `YYYY-MM-DD-your-title.md`,
edit the front matter:

| Key | Purpose |
| --- | --- |
| `title`, `date`, `author` | shown in the meta row |
| `tags` | pill tags; posts group by tag on `/archive/` |
| `accent` | mascot color for the post: `peacock` `orchid` `fawn` `jay` `fox` `frog` |
| `hero` / `hero_alt` | optional hero image (put files in `assets/images/`) |
| `description` | excerpt on home page + RSS + SEO |

## Sending a post as a newsletter

Open the published post and click **✉ Copy for email**. The button inlines all
styles and copies rich HTML to your clipboard — paste directly into Gmail,
Outlook or Apple Mail and send. Links and image URLs are made absolute
automatically. (Fallback: select the article text and copy normally.)

Tips for email-safe posts: stick to paragraphs, headings, lists, blockquotes
and images. Avoid raw HTML layouts, tables and embeds.

## Configuration (`_config.yml`)

- `google_analytics` — paste your `G-XXXXXXXXXX` ID to enable GA.
- `newsletter_action` — form action URL from Buttondown / Mailchimp / ConvertKit.
  Leave empty to hide the signup box.
- `social` — footer links; delete any you don't use.

RSS feed is served at `/feed.xml` (jekyll-feed, GitHub Pages whitelisted).
