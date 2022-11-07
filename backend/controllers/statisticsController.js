const prisma = require("../prisma/prismaClient");


const getMostHoursTaken = async (req, res) => {
    
    const { id } = req.params;
    console.log(id)

    try {
        const hoursTaken = await prisma.citas.groupBy({
            by: ["fecha"],
            where: {
                id_especialista: Number(id),
            },
            _count: {
                fecha: true,
            },
        });

        res.status(200).json(hoursTaken);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

module.exports = {
    getMostHoursTaken,
};