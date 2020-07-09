const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const router = new Router();
const User = require("../models").user;

// To verify if the user exists or not using emailId
router.get("/:email", async (request, response, next) => {
  try {
    const { email } = request.params;
    if (!email) {
      return response
        .status(400)
        .send({ message: "email is not passed in the body" });
    }
    const user = await User.findOne({
      where: { email },
    });
    //removing this condition because to display that user is not found in front end
    //not with status code in the backend
    /*  if (!user) {
      response.status(404).send("user not found");
    } else { */
    response.send(user);
    // }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
