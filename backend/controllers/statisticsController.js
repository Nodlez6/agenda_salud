const prisma = require("../prisma/prismaClient");


const getMostHoursTaken = async (req, res) => {
    
    const { id } = req.params;

    try {
        const hoursTaken = await prisma.citas.groupBy({
            by: ["fecha"],
            where: {
                id_especialista: Number(id),
            },
            _count: {
                fecha: true,
            },
            orderBy: {
                fecha: "asc",
            },
        });

        res.status(200).json(hoursTaken);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

const getQuantityByPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        const quantityByPaciente = await prisma.citas.groupBy({
            by: ["id_usuario"],
            where: {
                id_especialista: Number(id),
            },
            include: {
                usuarios: true,
            },
        });

        console.log(quantityByPaciente);
        res.status(200).json(quantityByPaciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


module.exports = {
    getMostHoursTaken,
    getQuantityByPaciente
};