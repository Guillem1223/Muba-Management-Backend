const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users, performers, contractor, contracts } = require("../models");
const AuthController = {};

AuthController.register = async (req, res) => {
  console.log(req.body);

  try {
    const {
      nombre_user,
      email,
      password,
      telefono,
      project_description,
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
      nombre_user,
      email,
      password: encryptedPassword,
      telefono,
      project_description,
      rate_nonprofit_event,
      rate_150_capacity_event,
      rate_300_capacity_event,
      rate_350_capacity_event,
      rate_1000_capacity_event,
      tax_data,
      backline,
      technical_rider,
      role,
    };
    let users_type_id;
    try {
      const user = await users.create(newUser);
      users_type_id = user.users_type_id;
      newUser = { ...newUser, users_type_id };
    } catch (error) {
      console.log(error);
    }
    console.log("newUser: " + newUser);
    console.log(users_type_id);
    console.log(role);

    //muy importante nunca puede guardarse un case super admin
    switch (role) {
      case "super_admin":
        // lo que hacemos es convertir un possible rol que entre como super_admin a user
        role = "user";
        break;
      case "performer":
        try {
          console.log("hola");
          await performers.create(newUser);
        } catch (error) {
          console.log(error);
        }
        break;
      case "contractor":
        try {
          await contractor.create(newUser);
        } catch (error) {
          console.log(error);
        }
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Create user successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error?.message || error,
    });
  }
};
AuthController.update = async (req, res) => {
  try {
    console.log(req.body);
    const {
      nombre_user,
      email,
      password,
      telefono,
      project_description,
      rate_nonprofit_event,
      rate_150_capacity_event,
      rate_300_capacity_event,
      rate_350_capacity_event,
      rate_1000_capacity_event,
      tax_data,
      backline,
      technical_rider,
      role,
      contracts_id,
    } = req.body;

    console.log(nombre_user);
    // Buscar el usuario en la base de datos a partir de su ID
    let user = await users.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validar la contraseña si se envía en la solicitud
    if (password && password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Password is shorter than 6 characters",
      });
    }

    // Encriptar la contraseña si se envía en la solicitud
    const encryptedPassword = password
      ? bcrypt.hashSync(password, 10)
      : user.password;

    // Actualizar los datos del usuario en la base de datos
    console.log("role: ", role);
    switch (role) {
      case "performer":
        user = await users.findByPk(req.params.id, {
          include: [
            {
              model: performers,
              as: "performers",
              include: { model: contracts, as: "contracts" },
            },
          ],
        });
        console.log("user :" + nombre_user);
        const updatedUser = await user.update({
          nombre_user: nombre_user || user.nombre_user,
          email: email || user.email,
          password: encryptedPassword,
          telefono: telefono || user.telefono,
        });
        console.log("updateUser: ", updatedUser);
        const performer = await performers.findOne({
          users_type_id: req.params.id,
        });
        console.log(performer.project_description);
        await performer.update({
          project_decription:
            project_description || user.performers.project_description,
          rate_nonprofit_event:
            rate_nonprofit_event || user.performers.rate_nonprofit_event,
          rate_150_capacity_event:
            rate_150_capacity_event || user.performers.rate_150_capacity_event,
          rate_300_capacity_event:
            rate_300_capacity_event || user.performers.rate_300_capacity_event,
          rate_350_capacity_event:
            rate_350_capacity_event || user.performers.rate_350_capacity_event,
          rate_1000_capacity_event:
            rate_1000_capacity_event ||
            user.performers.rate_1000_capacity_event,
        });

        break;
      case "contractor":
        user = await users.findByPk(req.params.id, {
          include: [
            {
              model: contractor,
              as: "contractors",
              include: { model: contracts, as: "contract" },
            },
          ],
        });
        console.log("user :" + user.contractors.contractors_id);
        await user.update({
          nombre_user: nombre_user || user.nombre_user,
          email: email || user.email,
          password: encryptedPassword,
          telefono: telefono || user.telefono,
        });
        const contractor_ = await contractor.findOne({
          users_type_id: req.params.id,
        });
        console.log("taxData :" + contractor_.tax_data);
        await contractor_.update({
          contracts_id: contracts_id || user.contracts.contracts.id,
          tax_data: tax_data || user.contractors.tax_data,
          backline: backline || user.contractors.backline,
          technical_rider: technical_rider || user.contractors.technical_rider,
        });

      default:
        console.log("update user error");
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Update user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error?.message || error,
    });
  }
};

AuthController.login = async (req, res) => {
  console.log("body: ", req.body);

  try {
    const { email, password } = req.body;

    //Validación de lo que me llega por body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await users.findOne({ where: { email: email } });
    console.log("info bcrypt: ", password, user.password);
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Bad Credentials",
      });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { user_id: user.users_type_id, user_role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    return res.status(200).json({
      success: true,
      message: `User Logged as ${user.role.toUpperCase()}`,
      token: token,
      role: user.role,
      id: user.users_type_id,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: "User Login failed",
    });
  }
};

module.exports = AuthController;
