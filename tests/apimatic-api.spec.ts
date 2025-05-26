import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('APIMatic API Automation', () => {
  let apiContext: APIRequestContext;
  const BASE_URL = 'https://api.dev.apimatic.io/portal/v2';
  const AUTH_HEADER = {
    'Authorization': 'X-Auth-Key mF8v7IlZErAxkdhPhwuKaA72S4YfSXOKDLqnwO77mAWuOAtzzDW9JHVQ3k8eS_cT'
  };
  const ZIP_PATH = path.resolve('data', 'petstore.zip'); // Place a sample.zip in the tests folder

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext();
  });

  test('POST zip file and poll for binary status response', async () => {
    // 1. POST request with form-data using Playwright's multipart option
    const postResponse = await apiContext.post(BASE_URL, {
      headers: AUTH_HEADER,
      multipart: {
        file: fs.createReadStream(ZIP_PATH)
      }
    });
    console.log('POST Response:', await postResponse.json());
    expect(postResponse.ok()).toBeTruthy();
    const postData = await postResponse.json();
    const id = postData.id;
    expect(id).toBeTruthy();

    // 2. Poll GET /{id}/status until binary response is returned
    let binaryReceived = false;
    for (let i = 0; i < 20; i++) {
      const statusResponse = await apiContext.get(`${BASE_URL}/${id}/status`, {
        headers: AUTH_HEADER
      });
      expect(statusResponse.ok()).toBeTruthy();
      const contentType = statusResponse.headers()['content-type'];
      if (contentType && (contentType.includes('application/zip') || contentType.includes('application/octet-stream'))) {
        // Binary response received
        binaryReceived = true;
        // Optionally, save the binary file
        const buffer = await statusResponse.body();
        fs.writeFileSync(path.resolve('data', `${id}-result.zip`), buffer);
        break;
      }
      await new Promise(res => setTimeout(res, 2000)); // wait 2 seconds
    }
    expect(binaryReceived).toBeTruthy();
  });
});
