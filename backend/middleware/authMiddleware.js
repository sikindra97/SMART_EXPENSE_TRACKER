// const jwt = require("jsonwebtoken");

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization) {
//     token = req.headers.authorization.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = decoded.id;

//       next();
//     } catch (error) {
//       res.status(401).json({
//         message: "Invalid Token",
//       });
//     }
//   }

//   if (!token) {
//     res.status(401).json({
//       message: "No Token",
//     });
//   }
// };

// module.exports = protect;


const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded.id;

      return next();

    } catch (error) {

      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  }

  return res.status(401).json({
    message: "No Token",
  });
};

module.exports = protect;