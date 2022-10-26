module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { tableName: 'users' });

  return User;
};