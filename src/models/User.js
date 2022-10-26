module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { tableName: 'users' });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blog_pots',
      foreignKey: 'user_id',
    })
  }

  return User;
};