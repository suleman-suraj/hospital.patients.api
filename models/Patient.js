const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
    },
    lname: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    temperature: {
      type: Number,
      trim: true,
      required: true,
    },
    weight: {
      type: Number,
      trim: true,
      required: true,
    },
    height: {
      type: Number,
      trim: true,
      required: true,
    },
    about: {
      type: String,
      trim: true,
      required: true,
    },
    diagnosis: {
      type: String,
      trim: true,
      required: true,
    },
    prescription : {
      type: String,
      trim: true,
      required: true,
    },
  },{
    timestamps: true,
  }
);

const Patient = mongoose.model("patientdatamessages", patientSchema);

module.exports = Patient;
