require('./src/globals');

const express = require("express");
const app = express();
const cron = require('node-cron');

const tasks = require('./src/services/tasks')
require('./src/services/axies');

//cors configuration
const corsOptions = {
  origin: "http://localhost:8081"
};

// ---- cron ------
tasks.run(cron);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});