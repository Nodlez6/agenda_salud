const prisma = require("../prisma/prismaClient");

const getAllSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await prisma.horarios.findUnique({
      where: {
        id_especialista: Number(id),
      },
    });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSchedule = async (req, res) => {
  const { idEspecialista, fecha, desde, hasta, periodicidad } = req.body;

  try {
    const schedule = await prisma.horarios.create({
      data: {
        id_especialista: idEspecialista,
        fecha: fecha,
        desde: desde,
        hasta: hasta,
        periodicidad: periodicidad,
      },
    });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};

module.exports = {
  getAllSchedule,
  createSchedule,
};
