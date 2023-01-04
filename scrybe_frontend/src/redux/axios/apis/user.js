import api from "../axios";

class User {
  constructor(request) {
    this.request = request;
  }

  async SignUp(data) {
    return this.request.post(`create_users`, data);
  }

  async SignIn(data) {
    return this.request.post(`login`, data);
  }

  async GoogleSignIn(email) {
    return this.request.get(`auth/google?email=${email}`);
  }

  async Account() {
    return this.request.get(`account`);
  }
}

const baseURL = "https://api.heed.cx/users/";
api.defaults.baseURL = baseURL;

const UserService = new User(api);

export default UserService;
