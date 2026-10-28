import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';

test('Log in with valid credentials', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  expect(registration.status()).toBe(201);

  const response = await test.step('Log in with the new user credentials', () =>
    auth.login(user)
  );

  expect(response.status()).toBe(200);
});

test('Reject incorrect password', async ({ request }) => {
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

test('Reject login without password', async ({ request }) => {
  const auth = new AuthService(new ApiService(request));
  const response = await test.step('Log in without a password', () =>
    auth.login({
      email: 'haristester@example.com',
      username: 'haristester'
    })
  );

  expect(response.status()).toBe(400);
});

test('Reject login for unregistered email', async ({ request }) => {
  const auth = new AuthService(new ApiService(request));
  const id = randomUUID().replaceAll('-', '');
  const response = await test.step('Log in with an unregistered account', () =>
    auth.login({
      email: `unregistered-${id}@example.com`,
      username: `unregistered_${id}`,
      password: 'Password123!'
    })
  );

  expect(response.status()).toBe(404);
});
