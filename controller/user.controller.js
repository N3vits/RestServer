import bcryptjs from "bcryptjs";
import User from "../models/user.js";

export const getUser = async(req, res) => {
  const {lim, sk} = req.query;
  const query = {status: true};
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(parseInt(sk))
      .limit(parseInt(lim))
  ])
  res.json({
    total,
    users
  })
};

export const postUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Password encryption
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Save info in database
  await user.save();
  res.json({
    user,
  });
};

export const deleteUser = async(req, res) => {
  const {id} = req.params;
  const logged = req.user;
  const user = await User.findByIdAndDelete(id, {status: false} );
  res.json({
    user,
    logged
  });
};

export const putUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...waste } = req.body;

  //Encrypt passwords
  if (password) {
    const salt = bcryptjs.genSaltSync();
    waste.password = bcryptjs.hashSync(password, salt);
  }

  //Database query
  try {
    const user = await User.findByIdAndUpdate(id, waste);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json({
      msg: "put API - Controller",
      user
    });
  } catch (err) {
    throw new Error(err);
  }

};

export const patchUser = (req, res) => {
  res.json({
    msg: "patch API - Controller",
  });
};
