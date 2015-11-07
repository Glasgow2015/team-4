/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	register: function(req, res) {
		var username = req.headers.username || req.param("username");
    var password = req.headers.password || req.param("password");

		if (req.headers.authorization) {
      var info = new Buffer(req.headers.authorization.split(" ")[1], "base64").toString("ascii").split(":");
      username = info[0];
      password = info[1];
    }

		User.findOne({
			or: [{
			  "username": username
			}]
		}, function(err, user) {
			if (err) {
			  Logging.error("Error in register, user query: " + err.toString());
			  return res.jsonp(FailureResult.incorrectData("There is a problem with the data."));
			} else if (user) {
		      return res.send({
						error: "Username already taken."
					});
			} else {
			  return User.create({
					username: username
				}).then(function(user) {
					return Passport.create({
						protocol: 'local',
						password: password,
						user: user.id
					}).then(function() {
						req.login(user, function(loginErr) {
							if (loginErr) {
								return res.send({
									error: "Registration successful, but we couldn't log you in. Please try loggin in again."
								});
							} else {
								return res.send(new_token);
							}
						});
					});
				}).catch(function(err) {
					sails.log.error("register", err);
					return res.send({
						error: "Could not create your account."
					});
				});
			}
		});
	}
};
