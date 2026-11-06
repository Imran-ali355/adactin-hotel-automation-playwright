import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';
import { attachApiLog } from '../../services/apiLogger.js';
import apiData from '../../test_Data/apiData.json';

test('Delete logged-in user account', async ({ request }, testInfo) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await test.step('Register a test user', () => users.register(user));
  await attachApiLog(testInfo, 'Test user registration response', registration);
  expect(registration.status()).toBe(apiData.expected.createdStatus);

  const loginResponse = await test.step('Log in as the test user', () => auth.login(user));
  await attachApiLog(testInfo, 'Test user login response', loginResponse);
  expect(loginResponse.status()).toBe(apiData.expected.successStatus);

  const response = await test.step('Delete the account', () => users.deleteAccount());
  await attachApiLog(testInfo, 'Account deletion response', response);

  expect(response.status()).toBe(apiData.expected.successStatus);
});

test('Require login to delete account', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Delete the account without logging in', () =>
    users.deleteAccount()
  );
  await attachApiLog(testInfo, 'Unauthenticated account deletion response', response);

  expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
});

test('Reject login with wrong password before deletion', async ({ request }, testInfo) => {
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

test('Reject unknown account deletion endpoint', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Delete an unknown endpoint', () =>
    users.deleteUnknownAccount()
  );
  await attachApiLog(testInfo, 'Unknown account deletion response', response);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject deletion when the login credentials are incorrect', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);

  const login = await auth.login({ ...user, password: apiData.login.wrongPassword });
  expect(login.status()).toBe(apiData.expected.unauthorizedStatus);

  const deletion = await users.deleteAccount();
  expect(deletion.status()).toBe(apiData.expected.unauthorizedStatus);
});

test('Prevent login after deleting an account', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);
  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  const deletion = await users.deleteAccount();
  expect(deletion.status()).toBe(apiData.expected.successStatus);

  const loginAfterDeletion = await auth.login(user);
  expect(loginAfterDeletion.status()).toBe(apiData.expected.notFoundStatus);
});

test('Require an authenticated session for account deletion', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.deleteAccount();

  expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
});

test('Return not found for an unknown account deletion resource', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.deleteUnknownAccount();

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});
