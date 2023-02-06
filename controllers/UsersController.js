const express = require("express");
const mysql = require("mysql2");
const Router = require("express").Router;
const Users = require("../models/users");
const Performers = require("../models").Performers;
const Contracts = require("../models").Contracts;
const Contractor = require("../models").Contractor;
const { Op } = require("sequelize");

var usersController = {};

usersController.create = async (req, res) => {
  try {
    const { email, password, telefono, nombre_user, role } = req.body;
    const data = await Users.create({
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

module.exports = usersController;
