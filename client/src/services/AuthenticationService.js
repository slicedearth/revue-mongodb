import Api from '@/services/Api';

export default {
  register(credentials) {
    return Api().post('api/users', credentials);
  },
  login(credentials) {
    return Api().post('api/auth', credentials);
  },
};
