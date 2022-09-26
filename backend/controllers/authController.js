const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");

const auth = async (req, res) => {
  const { correo, contrasenia } = req.body;
  let user;

  user = await prisma.usuarios.findUnique({
    where: { correo: correo },
  });

  if (!user) {
    user = await prisma.especialistas.findUnique({
      where: { correo: correo },
    });
  }
  const match = await bcrypt.compare(contrasenia, user.contrasenia);

  if (user) {
    if (match) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Contraseña incorrecta" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
  auth,
};
