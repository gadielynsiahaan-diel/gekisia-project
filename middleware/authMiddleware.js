const jwt = require("jsonwebtoken");

exports.verifyToken = (
  req,
  res,
  next
) => {

  const token =
    req.headers.authorization;

  if(!token){

    return res.status(401).json({
      message: "No Token"
    });

  }

  try {

    const verified =
      jwt.verify(
        token,
        "GEKISIA_SECRET"
      );

    req.admin = verified;

    next();

  } catch(error){

    res.status(403).json({
      message: "Invalid Token"
    });

  }

};