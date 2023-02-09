const express = require("express");
const mysql = require("mysql2");
const Router = require("express").Router;

const { Op } = require("sequelize");

const { users, performers, contractor, contracts } = require("../models.js");
var usersController = {};

// usersController.create = async (req, res) => {
//   try {
//     const { email, password, telefono, nombre_user, role } = req.body;

//     const data = await users.create({
//       email,
//       password,
//       telefono,
//       nombre_user,
//       role,
//     });
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "some error ocurred while creating the client",
//       data: error,
//     });
//   }
// };
usersController.findAll = async (req, res) => {
  const { role } = req.params;
  try {
    let data;
    switch (role) {
      case "performer":
        data = await users.findAll({
          include: [
            {
              model: performers,
              as: "performers",
              include: { model: contracts, as: "contracts" },
            },
          ],
        });
        break;
      case "contractor":
        data = await users.findAll({
          include: [
            {
              model: contractor,
              as: "contractors",
              include: { model: contracts, as: "contract" },
            },
          ],
        });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "some error ocurred while retrieving users.",
      data: error,
    });
  }
};

module.exports = usersController;
