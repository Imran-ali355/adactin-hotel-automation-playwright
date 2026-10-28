import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';

test('Delete logged-in user account', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  expect(registration.status()).toBe(201);

  const loginResponse = await test.step('Log in as the test user', () => auth.login(user));
  expect(loginResponse.status()).toBe(200);

  const response = await test.step('Delete the account', () => users.deleteAccount());

  expect(response.status()).toBe(200);
});

test('Require login to delete account', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Delete the account without logging in', () =>
    users.deleteAccount()
  );

  expect(response.status()).toBe(401);
});

test('Reject login with wrong password before deletion', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  expect(registration.status()).toBe(201);

  const response = await test.step('Log in with an incorrect password', () =>
    auth.login({ ...user, password: 'WrongPassword999!' })
  );

  expect(response.status()).toBe(401);
});

test('Reject unknown account deletion endpoint', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Delete an unknown endpoint', () =>
    users.deleteUnknownAccount()
  );

  expect(response.status()).toBe(404);
});
