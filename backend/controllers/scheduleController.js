const prisma = require("../prisma/prismaClient");

const getAllSchedule = async (req, res) => {
  try {
    const schedule = await prisma.horarios.findMany();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSchedule = async (req, res) => {
  const { idEspecialista, fecha, horarios, periodicidad } = req.body;

  let schedule;
  try {
    horarios.forEach(async (item) => {
      schedule = await prisma.horarios.create({
        data: {
          id_especialista: Number(idEspecialista),
          fecha: new Date(fecha),
          desde: new Date(item.desde),
          hasta: new Date(item.hasta),
          periodicidad: periodicidad,
        },
      });
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
