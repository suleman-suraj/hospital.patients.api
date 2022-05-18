const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const validate = require("../config/validator");
const { generateToken } = require("../utils/generateToken");

//create a new user
exports.register = async (req, res) => {
  const { firstname, lastname, dob, email, contact, password, profession } = req.body;
  const valid = await validate({ firstname, lastname, dob, email, contact, password, profession });

  if (valid) {
    const hashedpassword = await bcrypt.hash(valid.password, 10);
    const user = await User.create({
      firstname,
      lastname,
      dob,
      email,
      contact,
      password: hashedpassword,
      profession,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        id: user._id,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid data",
    });
  }
};

//login in a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          email: user.email,
          password: user.password,
          id: user._id,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({
          message: "Invalid credentials",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid email",
      });
    }
  } catch {
    res.status(400).json({
      message: "User not found",
    });
  }
};

//getting users
exports.getUsers = (req, res) => {
  if (req.query.page == undefined) {
    User.find({}, (err, data) => {
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

    User.find({}, {}, { skip: 10 * (page - 1), limit: 10 }, (err, data) => {
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

// get a single user
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params._id);
  res.json(user);
};

//Deleteing data
exports.deleteUser = async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  await user.remove();
  res.json({
    message: "User deleted successfully",
  });
};
//updating a user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err) => {
    res.json({ message: "User updated" });
  });
};
