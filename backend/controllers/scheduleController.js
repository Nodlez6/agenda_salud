const prisma = require("../prisma/prismaClient");

const formatSchedule = (schedule) => {
  const Data = {};
  Data.lunes = [];
  Data.martes = [];
  Data.miercoles = [];
  Data.jueves = [];
  Data.viernes = [];
  Data.sabado = [];
  Data.domingo = [];
  schedule.forEach((item) => {
    const date = item.fecha;
    date.setDate(date.getDate() + 1);

    switch (date.getDay()) {
      case 1:
        Data.lunes.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      case 2:
        Data.martes.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      case 3:
        Data.miercoles.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      case 4:
        Data.jueves.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      case 5:
        Data.viernes.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      case 6:
        Data.sabado.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      case 0:
        Data.domingo.push({
          id: item.id,
          fecha: date.toLocaleDateString(),
          desde: item.desde.toLocaleTimeString(),
          hasta: item.hasta.toLocaleTimeString(),
          periodicidad: item.periodicidad,
          deleted_at: item.deletedat,
        });
        break;
      default:
        break;
    }
  });
  return Data;
};

const getAllSchedule = async (req, res) => {
  try {
    const schedule = await prisma.horarios.findMany();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScheduleBySpecialistWithPeriodicidad = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await prisma.horarios.findMany({
      where: { id_especialista: Number(id), NOT: { periodicidad: 0 } },
    });

    const data = formatSchedule(schedule);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScheduleBySpecialistWithoutPeriodicidad = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await prisma.horarios.findMany({
      where: { id_especialista: Number(id), periodicidad: 0 },
    });

    const data = formatSchedule(schedule);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSchedule = async (req, res) => {
  const { idEspecialista, fecha, horarios, periodicidad } = req.body;

  const deletedDate = req.body.deleted_at;

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
          deletedat: deletedDate,
        },
      });
    });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};

const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await prisma.horarios.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSchedule,
  createSchedule,
  getScheduleBySpecialistWithPeriodicidad,
  getScheduleBySpecialistWithoutPeriodicidad,
  deleteSchedule,
};
