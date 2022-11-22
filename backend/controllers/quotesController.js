const moment = require("moment");
const prisma = require("../prisma/prismaClient");
const { ConfirmarHora  } = require('./confirmController')

const createQuote = async (req, res) => {

    const { idEspecialista,idUsuario, fecha, horarios} = req.body;
    
    
    try {
        const quotesArrayResponse = [];
        let ides=""
        for (let i=0; i<horarios.length; i++){
            const quotes = await prisma.citas.create({
                data: {
                    id_especialista: Number(idEspecialista),
                    id_usuario: Number(idUsuario),
                    fecha: fecha,
                    desde: horarios[i].desde,
                    hasta: horarios[i].hasta,
                },
            });
        // horarios.forEach(async (item) => {
        //     quotes = await prisma.citas.create({
        //       data: {
        //         id_especialista: Number(idEspecialista),
        //         id_usuario: Number(idUsuario),
        //         fecha: new Date(fecha),
        //         desde: new Date(item.desde),
        //         hasta: new Date(item.hasta),
        //       },
        //     });
            
            ides=ides+quotes.id+","
            ConfirmarHora(quotes.id,quotes.fecha,quotes.desde,quotes.id_usuario)
          };
          console.log("gg")
          console.log("entregame",ides)
          res.status(200).json(ides);
    } catch (error) {
        console.log(error)
        res.status(500).json({
        error: error.message,
        });
    }
}

const deleteQuote = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params;
        const update = await prisma.citas.update({
            where: {
                id: Number(id),
            },
            data: {
                deletedat: new Date(),
            },
        });
        
        return res.status(200).send(update);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getQuotesByPacient = async (req, res) => {
    console.log("dsffd")
    try {
        const { pacientId } = req.params;
        console.log(pacientId)
        const quotes = await prisma.citas.findMany({
            where: {
                id_usuario: Number(pacientId),
                deletedat: null,
            },
            include: {
                especialistas: true,
            },
        });
     
        quotes.forEach((item) => {
            item.desde = moment(item.desde).format("HH:mm")
            item.hasta = moment(item.hasta).format("HH:mm")
        })
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({
        error: error.message,
        });
    }
}

const getQuotesBySpecialistWithoutInclude = async (req, res) => {
    console.log("dsffd")
    try {
        const { specialistId } = req.params;
        const quotes = await prisma.citas.findMany({
            where: {
                id_especialista: Number(specialistId),
                deletedat: null,
            },
        });
      
        quotes.forEach((item) => {
            item.desde =  moment(item.desde).format("HH:mm")
            item.hasta = moment(item.hasta).format("HH:mm")
        })
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({
        error: error.message,
        });
    }
}


module.exports = {
    createQuote,
    deleteQuote,
    getQuotesByPacient,
    getQuotesBySpecialistWithoutInclude
}