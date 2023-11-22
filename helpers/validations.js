import Role from "../models/role.js";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
/**
 *
 * @param {String} role
 * @returns Check if the role entered exists
 */
export const roleValidation = async (role = "") => {
  if (role != "") {
    const thereIsRole = await Role.findOne({ role });
    if (!thereIsRole) {
      throw new Error(`This role does not exist ${role}`);
    }
  }
  return;
};

/**
 *
 * @param {String} email
 * @returns Check if the email entered is valid
 */
export const emailValidationMiddleware = async (email) => {
  const thereisEmail = await User.findOne({ email });
  if (thereisEmail) {
    throw new Error(`This email already exists`);
  }
};

/**
 * @param {String} id
 * @returns Check if the id is valid
 */
export const idValidation = async (id) => {
  const thereisId = await User.findById(id);
  if (!thereisId) {
    throw new Error(`The entered id does not exist`);
  }
};

/**
 *
 * @param {String} email
 * @returns Checks if the email is valid and returns a boolean depending on the situation.
 */
export const emailValidation = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return {
      validation: true,
      user,
    };
  }
  return {
    validation: true,
    user,
  };
};

/**
 *
 * @param {String} email
 * @returns Checks if the user is active by means of an email passed as a parameter, depending on the situation it returns a boolean.
 */
export const activeUser = async (email) => {
  const user = await User.findOne({ email });
  if (!user.status) {
    return true;
  }
  return false;
};

/**
 *
 * @param {String} password
 * @returns Checks that the password is valid and depending on the case returns a boolean.
 */
export const passwordValidation = async (email, password) => {
  const user = await User.findOne({ email });
  const isPassword = bcryptjs.compareSync(password, user.password);
  if (!isPassword) {
    return true;
  }
  return false;
};
