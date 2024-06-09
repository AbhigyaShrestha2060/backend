const  authGuard = (req, res, next) => {
  // check incommin data
  console.log(req.headers);
  // Get authorization data from headers
  // Check or validate
  // Split the data (format : "Bearer token-asdfghjkl") - take only token
  // If token not found  then stop the process or send response
  // If token verified : next (function in controller)
  // If not verified : not auth
};
module.exports = {
  authGuard,
};
