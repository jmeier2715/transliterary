'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class textSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.textSubmission.belongsTo(models.user)

    }
  };
  textSubmission.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    languageId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    translation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'textSubmission',
  });
  return textSubmission;
};