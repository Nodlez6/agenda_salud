const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");

const auth = async (req, res) => {
  const { correo, contrasenia } = req.body;
  let user;
  let match;

  console.log(req.body);

  user = await prisma.usuarios.findFirst({
    where: { correo: correo },
  });

  if (!user) {
    user = await prisma.especialistas.findFirst({
      where: { correo: correo },
    });
  }
  if(user){
     match = await bcrypt.compare(contrasenia, user.contrasenia);
  }

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

// const verifyEmail = async (req, res) => {
//   const { correo } = req.body;
//   let user;
//   try {
//     user = await prisma.usuarios.findUnique({
//       where: { correo: correo },
//     });
//     if (!user) {
//       user = await prisma.especialistas.findUnique({
//         where: { correo: correo },
//       });
//     }
//     if (user) {
//       res.status(200).json(user);
//     }
//     else
//     {
//       res.status(404).json({ message: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
    
//   }

module.exports = {
  auth,
};
