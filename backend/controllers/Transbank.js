const WebpayPlus = require('transbank-sdk').WebpayPlus;



const CreateTransaction = async (req, res) => {
    const { id, amount } = req.body;
    const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    const returnUrl = 'http://localhost:3000/homepacient';
    const response = await (new WebpayPlus.Transaction()).create(buyOrder, sessionId, amount, returnUrl);
    console.log(response)
    res.status(200).json(response);
}
module.exports = {
    CreateTransaction
}