import Users from "../models/User";

class UserService {
  async finduserByEmail(email) {
    const user = Users.findOne({ where: { email } });
    if (!user) return null;
    const lastLogin = new Date().toISOString();
    await user.update({ lastLogin }, { where: { email } });
    return user;
  }
}

export default new UserService();
