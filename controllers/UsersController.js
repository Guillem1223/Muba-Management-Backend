const express = require("express");
const mysql = require("mysql2");
const Router = require("express").Router;

const { Op } = require("sequelize");

const { users, performers, contractor, contracts } = require("../models.js");
var usersController = {};

usersController.create = async (req, res) => {
  try {
    const { email, password, telefono, nombre_user, role } = req.body;

    const data = await users.create({
      email,
      password,
      telefono,
      nombre_user,
      role,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "some error ocurred while creating the client",
      data: error,
    });
  }
};
usersController.findAll = async (req, res) => {
  try {
    const data = await Users.findAll({
      include: [
        {
          model: performers,
          as: "performers",
          include: { model: contracts, as: "contracts" },
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).send({
      message: "some error ocurred while retrieving users.",
    });
  }
};

module.exports = usersController;
