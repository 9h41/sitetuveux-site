# sitetuveux.com (GitHub Pages + 11ty)

Static website migration from Wix to GitHub Pages.

## Stack
- 11ty
- Plain HTML/CSS/JS
- GitHub Actions deployment to Pages

## Local development

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

Output is generated in `_site/`.

## Content editing

- Page content is in `src/pages/*.md`
- Site metadata is in `src/data/site.json`
- Layouts are in `src/_includes/layouts/`
- Styles are in `src/assets/css/styles.css`

## Deployment

Push to `main`; GitHub Actions builds and deploys to GitHub Pages.

## DNS (manual)

At your DNS provider:
- Apex `A` records to GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www` as `CNAME` to `<your-github-username>.github.io`

Then validate HTTPS in repository Pages settings.
