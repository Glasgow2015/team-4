/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  passport.initialize()(req, res, function () {
    passport.session()(req, res, function () {
      if (!req.user) {
        return res.send({
          error: "Please log in"
        });
      }
      next();
    });
  });
  // if (req.session.authenticated) {
  //   next();
  // }
  //
  // res.forbidden("Life sucks");
};
