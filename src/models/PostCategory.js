module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    post_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  },
  { 
    tableName: 'posts_categories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'id',
    })
  }

  return PostCategory;
};