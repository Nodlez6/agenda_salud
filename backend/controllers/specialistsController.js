/* eslint-disable prettier/prettier */
const bcrypt = require("bcrypt");
const moment = require("moment");
const prisma = require("../prisma/prismaClient");

const saltRounds = 10;

const getAllSpecialists = async (req, res) => {
  try {
    const specialists = await prisma.especialistas.findMany();
    res.status(200).json(specialists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpecialistById = async (req, res) => {
  try {
    const { id } = req.params;
    const specialist = await prisma.especialistas.findUnique({
      where: { id: Number(id) }
    });
    res.status(200).json(specialist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpecialistsByEspecialidad = async (req, res) => {
  const { especialidad } = req.params;
  console.log(especialidad);
  try {
    const specialists = await prisma.especialistas.findMany({
      where: { especialidad: especialidad },
    });
    res.status(200).json(specialists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSpecialist = async (req, res) => {
  const { nombre, apellido, correo, contrasenia, especialidad, celular } =
    req.body;

  try {
    const hash = await bcrypt.hash(contrasenia, saltRounds);
    const specialists = await prisma.especialistas.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasenia: hash,
        especialidad: especialidad,
        celular: celular,
      },
    });
    res.status(200).json(specialists);
  } catch (error) {
    res.status(404).json({ message: "No se pudo crear el especialista" });
  }
};

const getPacientsByQuoteAndSpecialist = async (req, res) => {
  const { idEspecialidad } = req.params;
  console.log(idEspecialidad);
  try {
    const pacients = await prisma.citas.findMany({
      where: { id_especialista: Number(idEspecialidad),
      deletedat: null, },
      include: { usuarios: true },
    });

    pacients.forEach((item) => {
      item.desde =  moment(item.desde).format("HH:mm")
      item.hasta = moment(item.hasta).format("HH:mm")
  })
    res.status(200).json(pacients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSpecialist = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, celular } = req.body;
  try {
    const specialist = await prisma.especialistas.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        celular: celular,
      },
    });
    res.status(200).json(specialist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  getAllSpecialists,
  createSpecialist,
  getSpecialistsByEspecialidad,
  getSpecialistById,
  getPacientsByQuoteAndSpecialist,
  updateSpecialist,
};
