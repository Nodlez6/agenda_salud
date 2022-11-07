/* eslint-disable prettier/prettier */
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const specialistsRouter = require("./routes/specialistsRouter");
const authRouter = require("./routes/authRouter");
const schedulesRouter = require("./routes/schedulesRouter");
const fileSpec = require("./routes/fileSpec");
const quotesRouter = require("./routes/quotesRouter");
const fileUsers = require("./routes/fileUsers");
const confirmhour = require("./routes/ConfirmarRoute")
const transaction = require("./routes/transaction")

const app = express();
app.use(express.json());
app.use(cors());

app.use("/userfile", fileUsers);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/specialists", specialistsRouter);
app.use("/schedules", schedulesRouter);
app.use("/files", fileSpec);
app.use("/quotes",quotesRouter);
app.use("/transaction",transaction)

/*

app.use("/quotes", quotesRouter);
app.use("/schedule", scheduleRouter);
app.use("/filesUsers", filesUsersRouter);
app.use("/filesSpecialists", filesSpecialistsRouter);
*/

module.exports = app;
