# Contributor Manual

Thanks for your interest in contributing! We welcome contributions of all kinds, including bug fixes, new features, documentation improvements, and &ndash; eventually &ndash; translations.

## How to Contribute

1. **Fork** the repository.
2. **Create a feature branch**, for example:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, following the style and structure of the project or package you are modifying.
4. **Add a changeset** if your changes affect package users (bug fixes, features, or updates):
   ```bash
   pnpm exec changeset
   ```
   Follow the prompts to select a semver bump (`patch` or `minor`) and enter a summary for `CHANGELOG.md`. Documentation-only changes do not require a changeset.
5. Add tests or verify that your changes work as expected.
6. Commit your work using clear, descriptive commit messages, including the generated `.changeset/*.md` file.
7. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request.
   In your PR description, include:

- What you changed
- Why you changed it
- Any related issues or context

## Reporting Issues

Before opening a new issue:

- Check existing issues to avoid duplicates.
- Provide a clear description of the problem or feature request.
- For bugs, include steps to reproduce, expected vs. actual behavior, and any relevant logs or screenshots.
- For feature requests, explain the problem the feature solves and any alternatives you’ve considered.

## Code Style & Tests

- Follow the existing coding conventions (formatting, naming, structure).
- Update or add tests when appropriate.
- Ensure all tests pass before submitting your PR (if a test suite is available).
- Keep changes focused—smaller, well‑scoped PRs are easier to review and merge.

## Preview releases

Maintainers can create preview releases for any pull requests containing pending changesets by adding the `pr-preview` label to such PRs. When doing so, a GitHub Actions workflow will be triggered to create a preview release for all necessary packages and a comment will be added to the PR with instructions on how to install the preview packages.

To update a preview release after making additional changes to the PR, add the `pr-preview` label again to re-trigger the workflow.
