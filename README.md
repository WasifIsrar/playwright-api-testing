# Playwright API Automation Framework

This project uses Playwright to automate API testing. It currently demonstrates:
- POST to `https://api.dev.apimatic.io/portal/v2` with a zip file and custom header
- Polling GET to `https://api.dev.apimatic.io/portal/v2/{id}/status` until a status object is returned

## Setup
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run tests:
   ```powershell
   npx playwright test
   ```

## Structure
- Tests will be in the `tests/` directory.
- Uses Playwright's `APIRequestContext` for HTTP requests.

## Customization
- Update endpoints, headers, and file paths as needed for your use case.
