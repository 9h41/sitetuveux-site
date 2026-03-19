# Staging Subdomain Checklist (`stg.sitetuveux.com`)

## 1) GitHub setup

- Push the `staging` branch.
- In repository settings, ensure **Pages** source is **GitHub Actions**.
- Run the `Deploy to GitHub Pages` workflow on `staging` once.

Workflow behavior on `staging`:
- CNAME deployed as `stg.sitetuveux.com`
- Canonical/OG/sitemap domain uses `https://stg.sitetuveux.com`
- Robots policy is `noindex,nofollow`

## 2) DNS record for staging

At your DNS provider, create:
- `CNAME` record: `stg` -> `<your-github-username>.github.io`

Recommended: TTL `300` while validating.

## 3) Validate resolution and TLS

```bash
dig +short stg.sitetuveux.com CNAME
curl -I https://stg.sitetuveux.com
```

Expected:
- CNAME resolves to GitHub Pages host.
- HTTPS responds with a valid certificate.

## 4) Functional checks

- `https://stg.sitetuveux.com/`
- `https://stg.sitetuveux.com/notreoffre/`
- `https://stg.sitetuveux.com/clients/`
- `https://stg.sitetuveux.com/contact/`
- `https://stg.sitetuveux.com/sitemap.xml`
- `https://stg.sitetuveux.com/robots.txt`

## 5) Production safety

- Keep production DNS (`sitetuveux.com`) unchanged while testing staging.
- Merge to `master`/`main` only when staging is validated.
- With a single Pages site per repository, the last successful deploy is the one served. If you need permanent concurrent prod+staging on Pages, use a separate staging repository.
