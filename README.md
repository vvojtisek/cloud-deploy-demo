# cloud-deploy-demo

## Local development

Install the exact dependency versions from the committed lockfile and run the tests:

```bash
npm ci
npm test
```

Run the service locally with `npm start`. It listens on port 8080 by default.

## Automated deployment

Pushing to `main` starts [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow runs dependency installation, security scans, tests, builds the Node 24 container, pushes both the commit-SHA and semantic-version image tags to ECR, and waits for ECS to reach a stable deployment. After deployment, it performs an E2E HTTP test against the live Application Load Balancer and uploads `e2e-results.json` as an audit artifact.

Patch and minor releases use a rolling update on the colour currently serving traffic. A major-version change stages the new image on the inactive blue/green target group, waits for ECS and ALB health checks, then switches the listener. If staging or post-switch health verification fails, the workflow restores the listener to the original colour and scales down the failed candidate.

The repository must have the AWS ECS/ECR/networking resources from `terraform/` already provisioned, plus this GitHub Actions secret:

- `AWS_ACCOUNT_ID`

Telegram notifications are enabled when both optional secrets are configured:

- `TELEGRAM_TO`
- `TELEGRAM_TOKEN`

Each fix/release increments the application patch version in `package.json`; the lockfile, container tag, and ECS `APP_VERSION` are kept in sync with it.
