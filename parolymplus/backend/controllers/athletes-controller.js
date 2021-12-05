const HttpError = require("../utils/http-error");

const Athlete = require("../models/athlete");

const athletesController = {
  async getMenu(request, response, next) {
    let athletes;
    try {
      athletes = await Athlete.find({});
    } catch (err) {
      const error = new HttpError(
        "Fetching athletes failed, please try again later.",
        500
      );
      return next(error);
    }
    response.json({ athletes: athletes.map((athlete) => athlete.toObject()) });
  },
};

module.exports = athletesController;
