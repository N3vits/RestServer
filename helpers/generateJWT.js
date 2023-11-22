import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("JWT could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};
