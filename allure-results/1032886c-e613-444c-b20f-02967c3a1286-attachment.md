# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\login.spec.js >> Reject login without an email
- Location: tests\API\login.spec.js:76:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 401
```

# Test source

```ts
  1   | import { randomUUID } from 'node:crypto';
  2   | import { test, expect } from '@playwright/test';
  3   | import { ApiService } from '../../services/api-service.js';
  4   | import { AuthService } from '../../services/auth-service.js';
  5   | import { UserService } from '../../services/user-service.js';
  6   | import { createTestUser } from './test-user.js';
  7   | import { attachApiLog } from '../../services/apiLogger.js';
  8   | import apiData from '../../test_Data/apiData.json';
  9   | 
  10  | test('Log in with valid credentials', async ({ request }, testInfo) => {
  11  |   const api = new ApiService(request);
  12  |   const users = new UserService(api);
  13  |   const auth = new AuthService(api);
  14  |   const user = createTestUser();
  15  |   const registration = await test.step('Register a test user', () => users.register(user));
  16  |   await attachApiLog(testInfo, 'Test user registration response', registration);
  17  |   expect(registration.status()).toBe(apiData.expected.createdStatus);
  18  | 
  19  |   const response = await test.step('Log in with the new user credentials', () =>
  20  |     auth.login(user)
  21  |   );
  22  |   await attachApiLog(testInfo, 'Valid login response', response);
  23  | 
  24  |   expect(response.status()).toBe(apiData.expected.successStatus);
  25  | });
  26  | 
  27  | test('Reject incorrect password', async ({ request }, testInfo) => {
  28  |   const api = new ApiService(request);
  29  |   const users = new UserService(api);
  30  |   const auth = new AuthService(api);
  31  |   const user = createTestUser();
  32  |   const registration = await test.step('Register a test user', () => users.register(user));
  33  |   await attachApiLog(testInfo, 'Test user registration response', registration);
  34  |   expect(registration.status()).toBe(apiData.expected.createdStatus);
  35  | 
  36  |   const response = await test.step('Log in with an incorrect password', () =>
  37  |     auth.login({ ...user, password: apiData.login.wrongPassword })
  38  |   );
  39  |   await attachApiLog(testInfo, 'Incorrect password login response', response);
  40  | 
  41  |   expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
  42  | });
  43  | 
  44  | test('Reject login without password', async ({ request }, testInfo) => {
  45  |   const auth = new AuthService(new ApiService(request));
  46  |   const response = await test.step('Log in without a password', () =>
  47  |     auth.login(apiData.login.missingPassword)
  48  |   );
  49  |   await attachApiLog(testInfo, 'Login without password response', response);
  50  | 
  51  |   expect(response.status()).toBe(apiData.expected.badRequestStatus);
  52  | });
  53  | 
  54  | test('Reject login for unregistered email', async ({ request }, testInfo) => {
  55  |   const auth = new AuthService(new ApiService(request));
  56  |   const id = randomUUID().replaceAll('-', '');
  57  |   const response = await test.step('Log in with an unregistered account', () =>
  58  |     auth.login({
  59  |       email: `${apiData.login.unregisteredEmailPrefix}${id}${apiData.user.emailDomain}`,
  60  |       username: `${apiData.login.unregisteredUsernamePrefix}${id}`,
  61  |       password: apiData.user.password
  62  |     })
  63  |   );
  64  |   await attachApiLog(testInfo, 'Unregistered account login response', response);
  65  | 
  66  |   expect(response.status()).toBe(apiData.expected.notFoundStatus);
  67  | });
  68  | 
  69  | test('Reject login without a username', async ({ request }) => {
  70  |   const auth = new AuthService(new ApiService(request));
  71  |   const response = await auth.login(apiData.login.missingUsername);
  72  | 
  73  |   expect(response.status()).toBe(apiData.expected.badRequestStatus);
  74  | });
  75  | 
  76  | test('Reject login without an email', async ({ request }) => {
  77  |   const auth = new AuthService(new ApiService(request));
  78  |   const response = await auth.login(apiData.login.missingEmail);
  79  | 
> 80  |   expect(response.status()).toBe(apiData.expected.badRequestStatus);
      |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  81  | });
  82  | 
  83  | test('Reject login for a registered user with an incorrect password', async ({ request }) => {
  84  |   const api = new ApiService(request);
  85  |   const users = new UserService(api);
  86  |   const auth = new AuthService(api);
  87  |   const user = createTestUser();
  88  |   const registration = await users.register(user);
  89  |   expect(registration.status()).toBe(apiData.expected.createdStatus);
  90  | 
  91  |   const response = await auth.login({ ...user, password: apiData.login.wrongPassword });
  92  | 
  93  |   expect(response.status()).toBe(apiData.expected.unauthorizedStatus);
  94  | });
  95  | 
  96  | test('Reject login for an unregistered account', async ({ request }) => {
  97  |   const auth = new AuthService(new ApiService(request));
  98  |   const response = await auth.login({
  99  |     email: apiData.login.unregisteredEmail,
  100 |     username: apiData.login.unregisteredUsername,
  101 |     password: apiData.user.password
  102 |   });
  103 | 
  104 |   expect(response.status()).toBe(apiData.expected.notFoundStatus);
  105 | });
  106 | 
```