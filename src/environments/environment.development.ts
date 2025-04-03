export const environment = {
  production: false,
  api: 'http://localhost:8080',
  auth: {
    baseUrl: 'api/auth',
    login: 'login',
    register: 'register'
  },
  roles: {
    baseUrl: 'api/roles'
  },
  users: {
    baseUrl: 'api/users'
  },
  userDetails: {
    baseUrl: 'api/users/details',
    me: 'me'
  }
};
