const router = require('express').Router()
const { getPatients, getPatient, createPatient, deletePatient,updatePatient } = require('../controllers/patientsController')
const { protect, admin } = require("../middlewares/authMiddleware");

router.get("/patient/pages", getPatients)
router.get("/patient/query/:_id", getPatient)
router.post("/patient", createPatient)
router.delete("/patient/query/:id", deletePatient)
router.put("/patient/:id", updatePatient)

module.exports = router