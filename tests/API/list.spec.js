import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { UserService } from '../../services/user-service.js';

test('Return users in API response', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Get all users', () => users.getAllUsers());
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.data.length).toBeGreaterThan(0);
});

test('Reject unknown users endpoint', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Request an unknown endpoint', () =>
    users.getAlternateUnknownEndpoint()
  );

  expect(response.status()).toBe(404);
});

test('Reject unsupported users-list method', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('POST to the users list endpoint', () =>
    users.postToUsersList({ name: 'test' })
  );

  expect([404, 405]).toContain(response.status());
});

test('Ignore malformed authorization header', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Get all users with a malformed authorization header', () =>
    users.getAllUsers({ headers: { Authorization: '******' } })
  );

  expect(response.status()).toBe(200);
});
