const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");

const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuarios.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.usuarios.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { nombre, apellido, correo, contrasenia, celular } = req.body;

  try {
    const hash = await bcrypt.hash(contrasenia, saltRounds);

    const user = await prisma.usuarios.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasenia: hash,
        celular: celular,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "No se pudo crear el usuario" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, celular } = req.body;
  try {
    const user = await prisma.usuarios.update({
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
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
};
