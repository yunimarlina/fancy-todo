'use strict';
const helpbcrypt = require('../helpers/bcrypt')
const bcrypt = require('bcryptjs')
const {
  Model, UniqueConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    namae: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: false,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'You Must Input an Email format'
        },
        notEmpty: {
          args: true,
          msg: 'Email Cannot be Blank'
        },
      },
  },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    // const salt = bcrypt.genSaltSync(10)
    // const hash = bcrypt.hashSync(instance.password, salt)
   instance.password = helpbcrypt.convert(instance.password)
  });
  return User;
};