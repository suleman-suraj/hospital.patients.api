const Patient = require("../models/Patient");

exports.getPatients = (req, res) => {
  if (req.query.page == undefined) {
    Patient.find({}, (err, data) => {
      if (data.length === 0) {
        res.json({ message: "No data found!" });
      } else {
        res.json({ totalResult: data.length, data });
        //res.json(data);
      }

      //res.json(data);
    });
  } else {
    var page = req.query.page;

    Patient.find({}, {}, { skip: 10 * (page - 1), limit: 10 }, (err, data) => {
      if (data.length === 0) {
        res.json({ message: "No data found!" });
      } else {
        res.json({ totalResult: data.length, data });
        //res.json(data);
      }

      //res.json(data);
    });
  }
};

// get a single patient
exports.getPatient = async (req, res) => {
  const patient = await Patient.findById(req.params._id);
  res.json(patient);
};

//Getting data through post
exports.createPatient = async (req, res) => {
    {
        const patientdata = {
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            age: Number(req.body.age),
            email: req.body.email,
            temperature: Number(req.body.temperature),
            weight: Number(req.body.weight),
            height: Number(req.body.height),
            about: req.body.about,
            diagnosis: req.body.diagnosis,
            prescription: req.body.prescription
        };
        const patientObject = new Patient(patientdata);
        patientObject
            .save()
            .then(() => res.json({ message: "patient added successfully" }));
    };
}
    //Deleteing data
    exports.deletePatient = async (req, res) => {
        const patient = await Patient.findById({ _id: req.params.id });
        await patient.remove();
        res.json({
            message: "Patient deleted successfully",
        });
    };
//updating a patient
    exports.updatePatient = (req, res) => {
        Patient.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err) => {
            res.json({ message: "patient updated" });
        });
    };

