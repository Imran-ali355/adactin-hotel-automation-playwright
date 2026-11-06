 import { test, expect } from '@playwright/test';
 import { ApiService } from '../../services/api-service.js';
 import { UserService } from '../../services/user-service.js';
 import { attachApiLog } from '../../services/apiLogger.js';
 import apiData from '../../test_Data/apiData.json';

 test('List all users', async ({ request }, testInfo) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('Get all users', () => users.getAllUsers());
   await attachApiLog(testInfo, 'Get all users response', response);

   expect(response.status()).toBe(apiData.expected.successStatus);
 });

 test('Reject unknown users endpoint', async ({ request }, testInfo) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('Request an unknown endpoint', () =>
     users.getUnknownEndpoint()
   );
   await attachApiLog(testInfo, 'Unknown users endpoint response', response);

   expect(response.status()).toBe(apiData.expected.notFoundStatus);
 });

 test('Reject POST on users list', async ({ request }, testInfo) => {
   const users = new UserService(new ApiService(request));
   const response = await test.step('POST to the users list endpoint', () =>
     users.postToUsersList(apiData.registration.listEndpointPost)
   );
   await attachApiLog(testInfo, 'POST users list response', response);

   expect(response.status()).toBeGreaterThanOrEqual(apiData.expected.badRequestStatus);
 });

 test('Return a non-empty users collection', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await users.getAllUsers();
   const body = await response.json();

   expect(response.status()).toBe(apiData.expected.successStatus);
   expect(body.data.length).toBeGreaterThanOrEqual(apiData.expected.minimumUsers);
 });

 test('Return users with the configured content type', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await users.getAllUsers();

   expect(response.status()).toBe(apiData.expected.successStatus);
   expect(response.headers()['content-type']).toContain(apiData.expected.usersContentType);
 });

 test('Return not found for an unknown users endpoint', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await users.getUnknownEndpoint();

   expect(response.status()).toBe(apiData.expected.notFoundStatus);
 });

 test('Reject attempts to create a user through the list endpoint', async ({ request }) => {
   const users = new UserService(new ApiService(request));
   const response = await users.postToUsersList(apiData.registration.missingUsername);

   expect(response.status()).toBeGreaterThanOrEqual(apiData.expected.badRequestStatus);
 });
