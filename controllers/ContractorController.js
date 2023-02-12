const { users, performers, contractor, contracts } = require("../models.js");

const contractorController = {};
contractorController.getById = async (req, res) => {
  console.log("hola");
  console.log("antes de la consulta a la base de datos: ", req.params.id);
  const id = req.params.id;

  try {
    const user = await users.findOne({
      where: { users_type_id: id },
      include: [
        {
          model: contractor,
          as: "contractors",
          include: [
            {
              model: contracts,
              as: "contract",
            },
          ],
        },
      ],
    });
    console.log("despues de al consulta a la base de datos: ", user);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({
        message: `Cannot find user with id = ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving user with id = ${id}: ${error}`,
    });
  }
};

module.exports = contractorController;
