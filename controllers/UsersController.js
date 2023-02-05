import express from "express";
import mysql from "mysql2";
import { Router } from "express";
import { Users, Performers, Contracts, Contractor } from "../models";

export const usersController = {};

usersController.create = async (req, res) => {
  try {
    const { email, password, telefono, nombre_user, role } = req.body;
    const users = await Users.create({
      email,
      password,
      telefono,
      nombre_user,
      role,
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: "some error ocurred while creating the client",
    });
  }
};

export default usersController;
