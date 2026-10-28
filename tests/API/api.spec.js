 import { test, expect } from '@playwright/test';
 import { ApiService } from '../../services/api-service.js';
 import { UserService } from '../../services/user-service.js';

 test('List all users', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('Get all users', () => users.getAllUsers());

   expect(response.status()).toBe(200);
 });

 test('Reject unknown users endpoint', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('Request an unknown endpoint', () =>
     users.getUnknownEndpoint()
   );

   expect(response.status()).toBe(404);
 });

 test('Reject POST on users list', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('POST to the users list endpoint', () =>
     users.postToUsersList({ name: 'Test User' })
   );

   expect(response.status()).toBeGreaterThanOrEqual(400);
 });
