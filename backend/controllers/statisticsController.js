const prisma = require("../prisma/prismaClient");


const getMostHoursTaken = async (req, res) => {
    
    const { id } = req.params;

    try {
        const hoursTaken = await prisma.citas.groupBy({
            by: ["fecha"],
            where: {
                id_especialista: Number(id),
                deletedat: null,
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
        const result = await prisma.$queryRaw`select count(*) as cantidad, CONCAT(u.nombre,' ',u.apellido) as Usuario from citas c
        inner join usuarios u ON u.id = c.id_usuario
        where id_especialista = ${Number(id)}
        and c.deletedat IS NULL
        group by u.nombre , u.apellido`

        result.forEach((item) => {
            item.cantidad = Number(item.cantidad);
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


module.exports = {
    getMostHoursTaken,
    getQuantityByPaciente
};