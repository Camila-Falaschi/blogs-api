module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { underscored: true, tableName: 'users' });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blog_pots',
      foreignKey: 'user_id',
    })
  }

  return User;
};