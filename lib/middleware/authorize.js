/* eslint-disable no-prototype-builtins */
module.exports = async (req, res, next) => {
  try {
    const { session } = req.cookies;
    if(!session) throw new Error('You must be signed in to continue');
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
