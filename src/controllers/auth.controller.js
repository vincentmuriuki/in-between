import Users from "../models/User";
import hash from "../utils/hash";
import JWTHelper from "../utils/jwt";
import Responses from "../utils/response";
import userService from "../services/auth.service";
import authService from "../services/auth.service";

class UserController {
  async createUser(req, res) {
    /**
     * @param firstName
     * @param lastName
     * @param password
     */
    const hashedPassword = hash.generateSync(req.body.password);
    const userData = {
      firstName: req.body.firstPassword,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email,
    };
    const user = await Users.create(userData);
    const token = await JWTHelper.signToken(user);

    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };
    return Responses.handleSuccess(201, "success", res, data);
  }

  async findUser(req, res) {
    const user = authService.finduserByEmail(req.body.email);
    if (!user) return Responses.handleError(404, "user does not exist", res);
    if (!hash.compareSync(req.body.password, user.password)) {
      return Responses.handleError(400, "invalid credentials", res);
    }

    const token = await JWTHelper.signToken(user);
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };
    return Responses.handleSuccess(200, "success", res, data);
  }

  async verifyAccount(req, res) {
      const user = Users.findOne({ where: { id: req.params.id }})
      await user.update(
          {
              isVerified: true
          },
          { where: { wmail: user.email } }
      )
      return res.status(200).redirect('/')
  }
}
