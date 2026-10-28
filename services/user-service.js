export class UserService {
  constructor(api) {
    this.api = api;
  }

  getAllUsers(options) {
    return this.api.get('/users/all-users', options);
  }

  getUnknownEndpoint() {
    return this.api.get('/users/invalid-endpoint');
  }

  getAlternateUnknownEndpoint() {
    return this.api.get('/users/invalid-endpoint-999');
  }

  postToUsersList(user) {
    return this.api.post('/users/all-users', user);
  }

  register(user) {
    return this.api.post('/users/register', user);
  }

  replaceAccount(user) {
    return this.api.put('/users/replace-account', user);
  }

  replaceUnknownAccount(user) {
    return this.api.put('/users/invalid-replace-endpoint', user);
  }

  deleteAccount() {
    return this.api.delete('/users/delete-account');
  }

  deleteUnknownAccount() {
    return this.api.delete('/users/invalid-delete-endpoint');
  }
}
