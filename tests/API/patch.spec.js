import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { AuthService } from '../../services/auth-service.js';
import { UserService } from '../../services/user-service.js';
import { createTestUser } from './test-user.js';
import apiData from '../../test_Data/apiData.json';

async function loginTestUser(request) {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();

  const registration = await users.register(user);
  expect(registration.status()).toBe(apiData.expected.createdStatus);

  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  return api;
}

test('Reject PATCH account with a new full name', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount(apiData.patch.fullname);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with a new email', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount({
    email: `${apiData.accountUpdate.emailPrefix}${createTestUser().email}`
  });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with a new username', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount({
    username: `${apiData.accountUpdate.usernamePrefix}${createTestUser().username}`
  });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with multiple fields', async ({ request }) => {
  const api = await loginTestUser(request);
  const user = createTestUser();
  const users = new UserService(api);
  const response = await users.patchAccount({
    fullname: apiData.accountUpdate.fullname,
    email: user.email,
    username: user.username
  });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Require login to PATCH an account', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.patchAccount(apiData.patch.fullname);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with an empty body', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount(apiData.patch.empty);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with an invalid email', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount({ email: apiData.update.invalidEmail.email });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with an email already in use', async ({ request }) => {
  const api = new ApiService(request);
  const users = new UserService(api);
  const auth = new AuthService(api);
  const user = createTestUser();
  const existingUser = createTestUser();

  const userRegistration = await users.register(user);
  expect(userRegistration.status()).toBe(apiData.expected.createdStatus);
  const existingUserRegistration = await users.register(existingUser);
  expect(existingUserRegistration.status()).toBe(apiData.expected.createdStatus);

  const login = await auth.login(user);
  expect(login.status()).toBe(apiData.expected.successStatus);

  const response = await users.patchAccount({ email: existingUser.email });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH to an unknown account endpoint', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.patchUnknownAccount(apiData.accountUpdate);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with malformed JSON', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccountMalformed(
    apiData.patch.malformedBody,
    apiData.expected.usersContentType
  );

  expect(response.status()).toBe(apiData.expected.badRequestStatus);
});

test('Reject PATCH account with an empty full name', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount({
    ...apiData.patch.fullname,
    fullname: apiData.patch.emptyField
  });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with an empty email', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount({ email: apiData.patch.emptyField });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH account with an empty username', async ({ request }) => {
  const api = await loginTestUser(request);
  const users = new UserService(api);
  const response = await users.patchAccount({ username: apiData.patch.emptyField });

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject PATCH to an unknown account resource', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.patchUnknownAccount(apiData.patch.empty);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});
