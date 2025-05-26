import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe("This Tests the Async API",() => {
    let apiContext: APIRequestContext;
    const BASE_URL = 'https://api.dev.apimatic.io/portal/v2';
      const AUTH_HEADER = {
        'Authorization': 'X-Auth-Key mF8v7IlZErAxkdhPhwuKaA72S4YfSXOKDLqnwO77mAWuOAtzzDW9JHVQ3k8eS_cT'
      };
      const ZIP_PATH = path.resolve('data', 'petstore.zip');
      test.beforeAll(async ({ playwright }) => {
      apiContext = await request.newContext();
}); // Place a sample.zip in the tests folder
test('POST zip file and poll for binary status response', async () => {
    const respone= await apiContext.post(BASE_URL, {
        headers: AUTH_HEADER,
        multipart: {
            file: fs.createReadStream(ZIP_PATH)
        }
    })
});
});

