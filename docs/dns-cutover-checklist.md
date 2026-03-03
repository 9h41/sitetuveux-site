# DNS Cutover Checklist (`sitetuveux.com`)

## 1) Before switching

- In GitHub repository settings, enable **Pages** and point to **GitHub Actions**.
- Ensure the workflow `Deploy to GitHub Pages` has succeeded at least once.
- Verify `CNAME` file is present with:

```txt
sitetuveux.com
```

- At DNS provider, set TTL for relevant records to `300` at least 24h before migration.

## 2) DNS records to apply

### Apex (`@`) records

Create/update these `A` records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### `www` host

Create/update this `CNAME` record:

- `www` -> `<your-github-username>.github.io`

## 3) Validation after switch

Run these checks:

```bash
dig +short sitetuveux.com A
dig +short www.sitetuveux.com CNAME
curl -I https://sitetuveux.com
curl -I https://www.sitetuveux.com
```

Expected:
- Apex resolves to GitHub Pages IPs.
- `www` resolves through GitHub Pages host.
- HTTPS works on both hosts.
- Canonical/redirect behavior matches your preference (apex primary recommended).

## 4) Post-cutover functional checks

- `/`
- `/notre-offre/`
- `/notrevision/`
- `/contact/`
- `/mentions-legales/`
- `/sitemap.xml`
- `/robots.txt`

## 5) Rollback plan

If needed, restore previous Wix DNS targets and wait for propagation (with low TTL, rollback is typically quick).
