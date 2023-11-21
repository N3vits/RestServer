import Role from "../models/role.js";
import User from "../models/user.js";

/**
 *
 * @param {String} role
 * @returns Verifies if the role entered exists
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
 * @returns verify if the email entered is valid
 */
export const emailValidation = async (email) => {
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
