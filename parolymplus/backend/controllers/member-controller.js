const HttpError = require('../utils/http-error');
const mongoose = require("mongoose");
const Trainer = require("../models/trainer");
const Member = require('../models/member');

const memberController = {
  async addMember(request, response, next) {

    const newMember = new Member(request.body);

    let trainer;
    try {
      trainer = await Trainer.findById(newMember.trainerId);
    } catch (err) {
      const error = new HttpError(
        "Adding member failed, please try again",
        500
      );
      return next(error);
    }

    if (!trainer) {
      const error = new HttpError("Could not find trainer for provided id", 404);
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newMember.save({ session: sess });
      trainer.team.push(newMember);
      await trainer.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Adding member failed, please try again.",
        500
      );
      return next(error);
    }

    response.status(201).json({ member: newMember });
  },

  async getTeamByTrainerId(request, response, next) {
    const trainerId = request.params.uid;

    let trainerTeam;
    try {
      trainerTeam = await Trainer.findById(trainerId).populate("team");
    } catch (err) {
      const error = new HttpError(
        "Fetching team failed, please try again later",
        500
      );
      return next(error);
    }
    if (!trainerTeam.team || trainerTeam.team.length === 0) {
      return next(
        new HttpError("Could not find any team for this user.", 404)
      );
    }

    response.json({
      team: trainerTeam.team.map((member) =>
        member.toObject({ getters: true })
      ),
    });
  },
      
  async getAllOrders(request, response, next) {
    let team;

    try{
      team = await Member.find({});
    } catch (err) {
        const error = new HttpError(
          'Fetching team failed, please try again later.',
          500
        );
      return next(error);
    }

    if (!team || team.length === 0) {
      const error =  new HttpError('We couldn\'t find any members', 404);
      return next(error);
    }

    response.status(200).json({team: team.map(member => member.toObject({getters:true}))});
  },

};

module.exports = memberController;
