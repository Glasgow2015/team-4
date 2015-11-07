/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var base32 = require("thirty-two");

var AuthController = {
    /**
     * Log out a user and return them to the homepage
     *
     * Passport exposes a logout() function on req (also aliased as logOut()) that
     * can be called from any route handler which needs to terminate a login
     * session. Invoking logout() will remove the req.user property and clear the
     * login session (if any).
     *
     * For more information on logging out users in Passport.js, check out:
     * http://passportjs.org/guide/logout/
     *
     * @param {Object} req
     * @param {Object} res
     */
    logout: function(req, res) {
        req.logout();
        if (!req.param("keep")) {
            delete req.session.secondFactor;
        }
        return res.send("");
    },
    /**
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function(req, res) {
        passport.endpoint(req, res);
    },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function(req, res) {
    if (req.param("error") || req.param("denied") || req.param("error_message")) {
        var errorDescription = req.param("error_description") || req.param("error_message");
        return res.send({
          error: "Failed"
        });
    }
    passport.callback(req, res, function(err, user) {
      if (err) {
          return res.send({
            error: "Failed"
          });
      } else {
        req.login(user, function(loginErr) {
          if (loginErr) {
              return res.send({
                error: "Failed"
              });
          } else {
              // Upon successful login, send the user to the homepage were req.user
              // will be available.
              if (req.param("provider", "local") == "local") {
                  return res.send(user, "Login successful.");
              } else {
                  return res.send({
                    error: "Failed"
                  });
              }
          }
        });
      }
    });
  }
};

module.exports = AuthController;
