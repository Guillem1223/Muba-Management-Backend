const { users, performers, contractor, contracts } = require("../models.js");

const contractsController = {};

contractsController.register = async (req, res) => {
  const {
    event_description,
    rate_type,
    contract_status,
    event_date,
    event_direction,
    event_shedule,
    invoice_status,
    contractor_id,
    performers_id,
  } = req.body;

  try {
    //Verificar si contractors_id existe en la tabla de contratistas
    const contractorExists = await contractor.findOne({
      where: { contractor_id },
    });
    if (!contractorExists) {
      return res.status(400).json({
        success: false,
        message: "El contratista especificado no existe en la base de datos",
        error: error?.message || error,
      });
    }

    //Verificar si performers_id existe en la tabla de artistas
    const performerExists = await performers.findOne({
      where: { performers_id },
    });
    if (!performerExists) {
      return res.status(400).json({
        success: false,
        message: "El artista especificado no existe en la base de datos",
        error: error?.message || error,
      });
    }

    // Crear un nuevo registro en la tabla de contratos
    const contract = await contracts.create({
      event_description,
      rate_type,
      contract_status,
      event_date,
      event_direction,
      event_shedule,
      invoice_status,
      contractor_id,
      performers_id,
    });

    return res.status(200).json({
      success: true,
      message: "Contrato creado exitosamente",
      contract,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
      message: "Error creando contrato",
    });
  }
};

module.exports = contractsController;
