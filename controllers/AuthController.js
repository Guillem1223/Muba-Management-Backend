const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users, performers, contractor } = require("../models");
const AuthController = {};

AuthController.register = async (req, res) => {
  console.log(req.body);

  try {
    const {
      nombre_user,
      email,
      password,
      telefono,
      project_decription,
      rate_nonprofit_event,
      rate_150_capacity_event,
      rate_300_capacity_event,
      rate_350_capacity_event,
      rate_1000_capacity_event,
      role,
      tax_data,
      backline,
      technical_rider,
    } = req.body;

    // PASSWORD CODE VALIDATION
    if (password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Password is shorter than 6 characters",
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    let newUser = {
      nombre_user: nombre_user,
      email: email,
      password: encryptedPassword,
      telefono: telefono,
      // project_decription,
      // rate_nonprofit_event,
      // rate_150_capacity_event,
      // rate_300_capacity_event,
      // rate_350_capacity_event,
      // rate_1000_capacity_event,
      // tax_data,
      // backline,
      // technical_rider,
    };
    try {
      const user = await users.create(newUser);
      // const users_type_id = user.users_type_id;
      // newUser = { ...newUser, users_type_id };
    } catch (error) {
      console.log(error);
    }
    // switch (role) {
    //   case "performer":
    //     try {
    //       console.log("hola");
    //       await performers.create(newUser);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     break;
    //   case "contractor":
    //     try {
    //       await contractor.create(newUser);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     break;
    // }

    return res.status(200).json({
      success: true,
      message: "Create user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error?.message || error,
    });
  }
};

AuthController.login = async (req, res) => {
  console.log(req.headers);

  try {
    const { email, password } = req.body;

    //Validación de lo que me llega por body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email });

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Bad Credentials",
      });
    }

    const token = jwt.sign(
      { user_id: user._id, user_role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    return res.status(200).json({
      success: true,
      message: `User Logged as ${user.role.toUpperCase()}`,
      token: token,
      role: user.role,
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Login failed",
    });
  }
};

module.exports = AuthController;
