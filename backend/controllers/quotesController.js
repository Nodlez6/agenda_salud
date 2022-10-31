const moment = require("moment");
const prisma = require("../prisma/prismaClient");
const { ConfirmarHora  } = require('./confirmController')

const createQuote = async (req, res) => {

    const { idEspecialista,idUsuario, fecha, horarios} = req.body;

    
    try {
        horarios.forEach(async (item) => {
            console.log(item.desde, new Date(item.desde).toLocaleTimeString())
            quotes = await prisma.citas.create({
              data: {
                id_especialista: Number(idEspecialista),
                id_usuario: Number(idUsuario),
                fecha: new Date(fecha),
                desde: new Date(item.desde),
                hasta: new Date(item.hasta),
              },
            });
            ConfirmarHora(quotes.id,quotes.fecha,quotes.desde,quotes.id_usuario)
          });
          res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({
        error: error.message,
        });
    }
}

const deleteQuote = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params;
        const deleted = await prisma.citas.delete({
            where: { id: Number(id) },
        });
        if (deleted) {
        return res.status(200).send(deleted);
        }
        throw new Error("Quote not found");
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