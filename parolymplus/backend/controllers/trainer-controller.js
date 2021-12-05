const HttpError = require("../utils/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Trainer = require("../models/trainer");

const trainersController = {

    async getTrainerById(request, response, next) {
      const trainerId = request.params.uid;
  
      let trainer;
      try {
        trainer= await Trainer.findById(trainerId);
      } catch (err) {
        const error = new HttpError(
          "Something went wrong, trainer could not be found.",
          500
        );
        return next(error);
      }
  
      response.json({ trainer: trainer.toObject({ getters: true }) });
    },

    async signup (request, response, next) {
        const { name, email, password } = request.body;
        
        let existingTrainer;
        try {
          existingTrainer = await Trainer.findOne({ email: email });
        } catch (err) {
          const error = new HttpError(
            "Signing up failed, please try again later.",
            500
          );
          return next(error);
        }

        if (existingTrainer) {
            const error = new HttpError(
              "Trainer exists already, please login instead.",
              422
            );
            return next(error);
          }

          let hashedPassword;
          try {
            hashedPassword = await bcrypt.hash(password, 12);
          } catch (err) {
            const error = new HttpError(
              "Could not create trainer, please try again.",
              500
            );
            return next(error);
          }

          const createdTrainer = new Trainer({
            name,
            email,
            password: hashedPassword,
            team: [],
          });

          try {
            await createdTrainer.save();
          } catch (err) {
            const error = new HttpError("Signing up failed, please try again.", 500);
            return next(error);
          }

          let token;
          try {
            token = jwt.sign(
              { trainerId: createdTrainer.id, email: createdTrainer.email },
              "very_secret_private_key",
              { expiresIn: "1h" }
            );
          } catch (err) {
            const error = new HttpError(
              "Signing up failed, please try again later.",
              500
            );
            return next(error);
          }

          response
          .status(201)
          .json({ trainerId: createdTrainer.id, email: createdTrainer.email, token: token });
      },

      async login(request, response, next) {
        const { email, password } = request.body;
        
        let existingTrainer;
        try {
           existingTrainer = await Trainer.findOne({ email: email });
         } catch (err) {
           const error = new HttpError(
             "Logging in failed, please try again later.",
             500
           );
           return next(error);
         }
     
         if (!existingTrainer) {
           const error = new HttpError("Trainer not found, could not log you in.", 403);
           return next(error);
         }

         let isValidPassword = false;
         try {
           isValidPassword = await bcrypt.compare(password, existingTrainer.password);
         } catch (err) {
           const error = new HttpError(
             "Could not log you in, please check your credentials and try again.",
             500
           );
           return next(error);
         }

         if (!isValidPassword) {
            const error = new HttpError(
              "Invalid credentials, could not log you in.",
              403
            );
            return next(error);
          }

          let token;
          try {
            token = jwt.sign(
              { trainerId: existingTrainer.id, email: existingTrainer.email },
              "very_secret_private_key",
              { expiresIn: "1h" }
            );
          } catch (err) {
            const error = new HttpError(
              "Logging in failed, please try again later.",
              500
            );
            return next(error);
          }
     
          response.json({      
            trainerId: existingTrainer.id,
            email: existingTrainer.email,
            token: token, 
          });
      },

      async updateTrainer(request, response, next) {

        const { name, email, password } = request.body;
        const trainerId = request.params.uid;
    
        let trainer;
        try {
          trainer = await Trainer.findById(trainerId);
        } catch (err) {
          const error = new HttpError(
            "Something went wrong, could not update trainer.",
            500
          );
          return next(error);
        }
    
        let hashedPassword;
        try {
          hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
          const error = new HttpError(
            "Something went wrong, could not update trainer.",
            500
          );
          return next(error);
        }
    
        trainer.name = name;
        trainer.email = email;
        trainer.password = hashedPassword;
    
        try {
          await trainer.save();
        } catch (err) {
          const error = new HttpError(
            "Something went wrong, could not update trainer.",
            500
          );
          return next(error);
        }
    
        response.status(200).json({ trainer: trainer.toObject({ getters: true }) });
      },

      async deleteTrainer(request, response, next) {
        const trainerId = request.params.uid;
    
        let trainer;
        try {
          trainer = await Trainer.findById(trainerId);
        } catch (err) {
          const error = new HttpError("Could not find a trainer with this id.", 500);
          return next(error);
        }
    
        try {
          await Trainer.findByIdAndDelete(trainerId);
        } catch (err) {
          const error = new HttpError(
            "Something went wrong, could not delete trainer.",
            500
          );
          return next(error);
        }
    
        response.status(200).json({ message: "Trainer was deleted!" });
      },
};

module.exports = trainersController;
