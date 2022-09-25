const bcrypt = require("bcrypt");
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

module.exports = {
  getAllSpecialists,
  createSpecialist,
};
