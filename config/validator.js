const yup = require("yup");

function validate(data) {
  const userSchema = yup.object().shape({
    firstname: yup.string().required("firstname can't be null").min(3).max(20),
    lastname: yup.string().required("lastname can't be null").min(3).max(20),
    dob: yup.string().required("date of birth can't be null").min(3).max(20),
    email: yup.string().required("email can't be null").min(3).max(50),
    contact: yup.string().required("contact can't be null").min(10).max(50),
    password: yup.string().required("password can't be null").min(8).max(20),
    profession: yup.string().required("profession can't be null").min(3).max(20),
  });

  return userSchema.validate(data);
}
module.exports = validate;
