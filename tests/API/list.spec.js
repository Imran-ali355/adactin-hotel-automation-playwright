import { test, expect } from '@playwright/test';
import { ApiService } from '../../services/api-service.js';
import { UserService } from '../../services/user-service.js';
import { attachApiLog } from '../../services/apiLogger.js';
import apiData from '../../test_Data/apiData.json';

test('Return users in API response', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Get all users', () => users.getAllUsers());
  await attachApiLog(testInfo, 'Get all users response', response);
  const responseBody = await response.json();

  expect(response.status()).toBe(apiData.expected.successStatus);
  expect(responseBody.data.length).toBeGreaterThanOrEqual(apiData.expected.minimumUsers);
});

test('Reject unknown users endpoint', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Request an unknown endpoint', () =>
    users.getAlternateUnknownEndpoint()
  );
  await attachApiLog(testInfo, 'Unknown users endpoint response', response);

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});

test('Reject unsupported users-list method', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('POST to the users list endpoint', () =>
    users.postToUsersList(apiData.registration.listEndpointPost)
  );
  await attachApiLog(testInfo, 'Unsupported users-list method response', response);

  expect(apiData.expected.unsupportedMethodStatuses).toContain(response.status());
});

test('Ignore malformed authorization header', async ({ request }, testInfo) => {
  const users = new UserService(new ApiService(request));
  const response = await test.step('Get all users with a malformed authorization header', () =>
    users.getAllUsers({ headers: { Authorization: apiData.headers.malformedAuthorization } })
  );
  await attachApiLog(testInfo, 'Malformed authorization response', response);

  expect(response.status()).toBe(apiData.expected.successStatus);
});

test('Include the required fields in each user record', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.getAllUsers();
  const body = await response.json();

  expect(response.status()).toBe(apiData.expected.successStatus);
  for (const user of body.data) {
    for (const field of apiData.expected.requiredUserFields) {
      expect(user).toHaveProperty(field);
    }
  }
});

test('Return a non-empty user collection', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.getAllUsers();
  const body = await response.json();

  expect(body.data.length).toBeGreaterThanOrEqual(apiData.expected.minimumUsers);
});

test('Return a JSON content type for the user list', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.getAllUsers();

  expect(response.headers()['content-type']).toContain(apiData.expected.usersContentType);
});

test('Return not found for an unknown users resource', async ({ request }) => {
  const users = new UserService(new ApiService(request));
  const response = await users.getAlternateUnknownEndpoint();

  expect(response.status()).toBe(apiData.expected.notFoundStatus);
});
