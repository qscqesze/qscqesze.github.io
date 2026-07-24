# Repository Instructions

## Git transport

- Use the repository's SSH remote (`git@github.com:qscqesze/qscqesze.github.io.git`) for Git fetch, pull, and push operations.
- Do not require or request GitHub CLI (`gh`) authentication for ordinary Git commits or pushes; use the configured Git-over-SSH authentication.
- Do not replace the `origin` remote with an HTTPS URL.
- Only require `gh` authentication when the user explicitly requests an operation that needs the GitHub CLI or GitHub API, such as creating a pull request.
