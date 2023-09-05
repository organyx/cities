const { StatusCodes } = require('http-status-codes');

function verifyAccessToken() {
  return (req, res, next) => {
    try {
      let accessToken;

      // Retrieve the access token - can be cookies, or HTTP header (in the future for mobile apps or other services)
      if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
        accessToken = req.headers.authorization.split(' ')[1];
      }

      if (!accessToken) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ code: StatusCodes.UNAUTHORIZED, message: 'Invalid token' })
          .end();
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  verifyAccessToken
};
