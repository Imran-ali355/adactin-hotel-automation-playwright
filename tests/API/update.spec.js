import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';

test('Update logged-in user account', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  expect(registration.status()).toBe(201);

  const loginResponse = await test.step('Log in as the test user', () => auth.login(user));
  expect(loginResponse.status()).toBe(200);

  const updateResponse = await test.step('Update the account', () =>
    users.replaceAccount({
      fullname: 'Updated User',
      email: `updated-${user.email}`,
      username: `updated_${user.username}`
    })
  );

  expect(updateResponse.status()).toBe(200);
});

test('Require login to update account', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Update the account without logging in', () =>
    users.replaceAccount({
      fullname: 'Updated User',
      email: 'updateduser@example.com',
      username: 'updatedUser'
    })
  );

  expect(response.status()).toBe(401);
});

test('Reject account update without full name', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  expect(registration.status()).toBe(201);
  const loginResponse = await test.step('Log in as the test user', () => auth.login(user));
  expect(loginResponse.status()).toBe(200);

  const response = await test.step('Update the account without a full name', () =>
    users.replaceAccount({
      email: 'incomplete@example.com',
      username: 'incompleteUser'
    })
  );

  expect(response.status()).toBe(400);
});

test('Reject unknown account update endpoint', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Update an unknown endpoint', () =>
    users.replaceUnknownAccount({
      fullname: 'Updated User',
      email: 'updateduser@example.com',
      username: 'updatedUser'
    })
  );

  expect(response.status()).toBe(404);
});
