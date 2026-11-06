import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';
import { attachApiLog } from '../../services/apiLogger.js';
import apiData from '../../test_Data/apiData.json';

test('Log in with valid credentials', async ({ request }, testInfo) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  await attachApiLog(testInfo, 'Test user registration response', registration);
  expect(registration.status()).toBe(apiData.expected.createdStatus);

  const response = await test.step('Log in with the new user credentials', () =>
    auth.login(user)
  );
  await attachApiLog(testInfo, 'Valid login response', response);

  expect(response.status()).toBe(apiData.expected.successStatus);
});

test('Reject incorrect password', async ({ request }, testInfo) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  await attachApiLog(testInfo, 'Test user registration response', registration);
  expect(registration.status()).toBe(apiData.expected.createdStatus);

  const response = await test.step('Log in with an incorrect password', () =>
    auth.login({ ...user, password: apiData.login.wrongPassword })
  );
  await attachApiLog(testInfo, 'Incorrect password login response', response);

  expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
});

test('Reject login without password', async ({ request }, testInfo) => {
  const auth = new AuthService(new ApiService(request));
  const response = await test.step('Log in without a password', () =>
    auth.login(apiData.login.missingPassword)
  );
  await attachApiLog(testInfo, 'Login without password response', response);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject login for unregistered email', async ({ request }, testInfo) => {
  const auth = new AuthService(new ApiService(request));
  const id = randomUUID().replaceAll('-', '');
  const response = await test.step('Log in with an unregistered account', () =>
    auth.login({
      email: `${apiData.login.unregisteredEmailPrefix}${id}${apiData.user.emailDomain}`,
      username: `${apiData.login.unregisteredUsernamePrefix}${id}`,
      password: apiData.user.password
    })
  );
  await attachApiLog(testInfo, 'Unregistered account login response', response);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject login without a username', async ({ request }) => {
  const auth = new AuthService(new ApiService(request));
  const { expectedStatus, ...credentials } = apiData.login.missingUsername;
  const response = await auth.login(credentials);

  expect(response.status()).toBe(expectedStatus);
});

test('Reject login without an email', async ({ request }) => {
  const auth = new AuthService(new ApiService(request));
  const { expectedStatus, ...credentials } = apiData.login.missingEmail;
  const response = await auth.login(credentials);

  expect(response.status()).toBe(expectedStatus);
});

test('Reject login for a registered user with an incorrect password', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);

  const response = await auth.login({ ...user, password: apiData.login.wrongPassword });

  expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
});

test('Reject login for an unregistered account', async ({ request }) => {
  const id = randomUUID().replaceAll('-', '');
  const auth = new AuthService(new ApiService(request));
  const response = await auth.login({
    email: `${apiData.login.unregisteredEmailPrefix}${id}${apiData.user.emailDomain}`,
    username: `${apiData.login.unregisteredUsernamePrefix}${id}`,
    password: apiData.user.password
  });

  expect(response.status()).toBe(apiData.login.unregisteredExpectedStatus);
});
