const WebpayPlus = require('transbank-sdk').WebpayPlus;
require("dotenv").config("./../.env");


const CreateTransaction = async (req, res) => {
    const { amount,ides } = req.body;
    console.log(req.body)
    const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    const returnUrl = `${process.env.FRONTED_URL}/comprobant/`+ides;
    const response = await (new WebpayPlus.Transaction()).create(buyOrder, sessionId, amount, returnUrl);
    console.log(response)
    res.status(200).json(response);
}
const GetConfirmation = async (req, res) => {
    const token = req.body.token_ws;
    console.log(req.body)
    const response = await (new WebpayPlus.Transaction()).commit(token);
    console.log(response)
    res.status(200).json(response);
}
module.exports = {
    CreateTransaction,
    GetConfirmation
}