import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

class Hash {
  generateSync(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
  }

  compareSync(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }
}

export default new Hash();
