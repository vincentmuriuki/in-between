import Sequelize from "sequelize";
import db from "../config/database.js";

const Users = db.define(
  "users",
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
    },
    gender: {
      type: Sequelize.STRING,
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    role: {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: "author",
      values: [
        "super_administrator",
        "travel_administrator",
        "suppliers",
        "travel_team_member",
        "manager",
        "customer",
        "car_owner",
      ],
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {}
);

Users.sync().then(() => {
  console.log("Table created");
});

export default Users;
