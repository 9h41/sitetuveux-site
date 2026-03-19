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

GitHub Actions builds and deploys to Pages on:
- `master` / `main` -> `sitetuveux.com`
- `staging` -> `stg.sitetuveux.com`

Create/update staging branch and push:

```bash
git checkout -b staging
git push -u origin staging
```

The workflow automatically sets:
- `SITE_DOMAIN` for canonical/OG/sitemap URLs
- `_site/CNAME` for the deployed custom domain

## DNS (manual)

At your DNS provider:
- Apex `A` records to GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www` as `CNAME` to `<your-github-username>.github.io`

Then validate HTTPS in repository Pages settings.

For staging DNS:
- `stg` as `CNAME` to `<your-github-username>.github.io`
