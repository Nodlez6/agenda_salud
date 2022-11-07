const moment = require("moment");
const prisma = require("../prisma/prismaClient");
var request = require("request");
const ConfirmarHora = async (id_cita,fecha,desde,id_usuario)=> {
        

        try{
        //string to date
        cita=await prisma.citas.findUnique({
            where: {
                id: id_cita,
            },
        });
        console.log(cita)
        if(cita.deletedat==null){
            user = await prisma.usuarios.findUnique({
                where: {
                    id: id_usuario,
                },
            });
            console.log(user)
            fecha=fecha.toISOString().split('T')[0]
            console.log(fecha)
            console.log(desde)
            //get hour of date using moment
            var hora = moment(desde).format("HH:mm");
            console.log(hora)
            //get date of date using moment not localtime
            // combine date and hour in type date using moment
            var fechaHora = moment(fecha + " " + hora).format("YYYY-MM-DD HH:mm");
            console.log(fechaHora)
            //substract one day to date using moment
            var fechaHoraAnterior = moment(fechaHora).subtract(1, "days").format("YYYY-MM-DD HH:mm");
            console.log(fechaHoraAnterior)
            //get milisecond of diference between date and now using moment
            var millisTill10 = moment(fechaHoraAnterior).diff(moment());
            console.log(millisTill10)
            setTimeout(function(){
                var options = {
                    method: 'POST',
                    url: 'https://api.ultramsg.com/instance21826/messages/chat',
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    form: {
                      token: 'hqwcgehmklar88dt',
                      to: '+'+user.celular,
                      body: 'Buenas, desea confirmar su hora para el dia '+fecha+' a las '+desde+'?',
                      priority: '1',
                      referenceId: ''
                    }
                  };
                  request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                  
                    console.log(body);
                  });

            }, millisTill10);
        }else{
            console.log("cita cancelada")
        }
    }catch(error){
        console.log(error)
    }

};
module.exports = {
    ConfirmarHora
}