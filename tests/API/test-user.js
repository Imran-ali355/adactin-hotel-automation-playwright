import { randomUUID } from 'node:crypto';
import apiData from '../../test_Data/apiData.json';

export function createTestUser() {
  const id = randomUUID().replaceAll('-', '');
  return {
    fullname: `${apiData.user.fullnamePrefix}${id}`,
    email: `${apiData.user.emailPrefix}${id}${apiData.user.emailDomain}`,
    username: `${apiData.user.usernamePrefix}${id}`,
    password: apiData.user.password
  };
}
