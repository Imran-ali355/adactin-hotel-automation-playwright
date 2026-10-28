 import { test, expect } from '@playwright/test';
 import { ApiService } from '../../services/api-service.js';
 import { UserService } from '../../services/user-service.js';
 import { attachApiLog } from '../../services/apiLogger.js';

 test('List all users', async ({ request }, testInfo) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('Get all users', () => users.getAllUsers());
   await attachApiLog(testInfo, 'Get all users response', response);

   expect(response.status()).toBe(200);
 });

 test('Reject unknown users endpoint', async ({ request }, testInfo) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('Request an unknown endpoint', () =>
     users.getUnknownEndpoint()
   );
   await attachApiLog(testInfo, 'Unknown users endpoint response', response);

   expect(response.status()).toBe(404);
 });

 test('Reject POST on users list', async ({ request }, testInfo) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('POST to the users list endpoint', () =>
     users.postToUsersList({ name: 'Test User' })
   );
   await attachApiLog(testInfo, 'POST users list response', response);

   expect(response.status()).toBeGreaterThanOrEqual(400);
 });
