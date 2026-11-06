import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';
import { attachApiLog } from '../../services/apiLogger.js';
import apiData from '../../test_Data/apiData.json';

test('Update logged-in user account', async ({ request }, testInfo) => {
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

  const updateResponse = await test.step('Update the account', () =>
    users.replaceAccount({
      fullname: apiData.accountUpdate.valid.fullname,
      email: `${apiData.accountUpdate.emailPrefix}${user.email}`,
      username: `${apiData.accountUpdate.usernamePrefix}${user.username}`
    })
  );
  await attachApiLog(testInfo, 'Account update response', updateResponse);

  expect(updateResponse.status()).toBe(apiData.expected.successStatus);
});

test('Require login to update account', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Update the account without logging in', () =>
    users.replaceAccount(apiData.accountUpdate.valid)
  );
  await attachApiLog(testInfo, 'Unauthenticated account update response', response);

  expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
});

test('Reject account update without full name', async ({ request }, testInfo) => {
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

  const response = await test.step('Update the account without a full name', () =>
    users.replaceAccount(apiData.update.missingFullname)
  );
  await attachApiLog(testInfo, 'Incomplete account update response', response);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject unknown account update endpoint', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Update an unknown endpoint', () =>
    users.replaceUnknownAccount(apiData.accountUpdate.valid)
  );
  await attachApiLog(testInfo, 'Unknown account update response', response);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject account update without an email', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);
  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  const response = await users.replaceAccount(apiData.update.missingEmail);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject account update without a username', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);
  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  const response = await users.replaceAccount(apiData.update.missingUsername);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject an empty account update', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);
  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  const response = await users.replaceAccount(apiData.update.empty);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject account update with an invalid email', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);
  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  const response = await users.replaceAccount(apiData.update.invalidEmail);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});
