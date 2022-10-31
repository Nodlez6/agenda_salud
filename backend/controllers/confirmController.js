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
        if(cita.deletedat==null){
            user = await prisma.usuarios.findUnique({
                where: {
                    id: id_usuario,
                },
            });

            var date = new Date(fecha,desde);
            var newDateObj = new Date(date);
            newDateObj.setDate(newDateObj.getDate() - 1);
            console.log(newDateObj)
            var millisTill10 = newDateObj-date;
            console.log(millisTill10)
            setTimeout(function(){
                var options = {
                    method: 'POST',
                    url: 'https://api.ultramsg.com/instance21826/messages/chat',
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    form: {
                      token: 'hqwcgehmklar88dt',
                      to: '%2B'+user.telefono,
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