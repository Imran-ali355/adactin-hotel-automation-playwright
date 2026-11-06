import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';
import { attachApiLog } from '../../services/apiLogger.js';
import apiData from '../../test_Data/apiData.json';

test('Register a user', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const user = createTestUser();
  const response = await test.step('Register the user', () => users.register(user));
  await attachApiLog(testInfo, 'User registration response', response);

  expect(response.status()).toBe(apiData.expected.createdStatus);
});

test('Reject registration without password', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Register without a password', () =>
    users.register(apiData.registration.missingPassword)
  );
  await attachApiLog(testInfo, 'Registration without password response', response);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject invalid registration email', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Register with an invalid email', () =>
    users.register(apiData.registration.invalidEmail)
  );
  await attachApiLog(testInfo, 'Invalid email registration response', response);

  expect(response.status()).toBe(apiData.expected.conflictStatus);
});

test('Reject duplicate user registration', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const user = createTestUser();
  const initialResponse = await test.step('Register a new user', () => users.register(user));
  await attachApiLog(testInfo, 'Initial user registration response', initialResponse);
  expect(initialResponse.status()).toBe(apiData.expected.createdStatus);

  const duplicateResponse = await test.step('Register the same user again', () =>
    users.register(user)
  );
  await attachApiLog(testInfo, 'Duplicate registration response', duplicateResponse);

  expect(duplicateResponse.status()).toBe(apiData.expected.conflictStatus);
});

test('Reject registration without a full name', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.register(apiData.registration.missingFullname);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject registration without an email', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.register(apiData.registration.missingEmail);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject registration without a username', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.register(apiData.registration.missingUsername);

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject registration with a malformed email address', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.register(apiData.registration.invalidEmail);

  expect(response.status()).toBe(apiData.expected.conflictStatus);
});
