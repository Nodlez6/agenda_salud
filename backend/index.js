const express = require("express");
const usersRouter = require("./routes/usersRouter");

const app = express();

app.use("/users", usersRouter);
/*
app.use("/specialists", specialistsRouter);
app.use("/quotes", quotesRouter);
app.use("/schedule", scheduleRouter);
app.use("/filesUsers", filesUsersRouter);
app.use("/filesSpecialists", filesSpecialistsRouter);
*/

module.exports = app;
