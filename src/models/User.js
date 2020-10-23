module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
      },
      gender: {
        type: DataTypes.STRING,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      role: {
        type: DataTypes.ENUM,
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Users.sync().then(() => {
    console.log("Table created");
  });

  return Users;
};

// export default Users;
