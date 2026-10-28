export class AuthService {
  constructor(api) {
    this.api = api;
  }

  login(credentials) {
    return this.api.post('/users/login', credentials);
  }
}
