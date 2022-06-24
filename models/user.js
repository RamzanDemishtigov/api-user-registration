'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const jwt = require('jsonwebtoken');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *            description: Must be between 8 and 20 characters
 *        example:
 *           name: Test User
 *           password: p@ssw0rd
 */

const {
  Model
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
    }
    generateToken() {
      return jwt.sign({
          id: this.id,
        },
        config.privateKey);
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      required: true,},
    surname: {
      type:DataTypes.STRING,
      allowNull: true},
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true,},
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      len: [8,20],
      required: true,},
    sex: {
      type:DataTypes.STRING,
      allowNull: true},
    photo: {
      type:DataTypes.STRING,
      allowNull: true},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};