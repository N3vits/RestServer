import { generateJWT } from "../helpers/generateJWT.js";
import {
  activeUser,
  emailValidation,
  emailValidationMiddleware,
  passwordValidation,
} from "../helpers/validations.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Email validation
    const {validation, user} = await emailValidation(email);
    if (!validation) {
      return res.status(400).json({
        msg: "User not found or Incorrect Email",
      });
    }
    //Active user validation
    const active = await activeUser(email);
    if (active) {
      return res.status(400).json({
        msg: "non-active user",
      });
    }
    //password Validation
    const isPassword = await passwordValidation(email, password);
    if (isPassword) {
      return res.status(400).json({
        msg: "Incorrect password",
      });
    }
    //Generate JWT
    const token = await generateJWT(user.id);
    console.log(user)
    return res.json({
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};
