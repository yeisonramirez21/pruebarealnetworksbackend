let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// Express Route
//const studentRoute = require('../backend/routes/student.route')
const studentRoute = require('../backend/routes/student.routes')
// Connecting mongoDB Database
mongoose
  //.connect('mongodb://127.0.0.1:27017/mydatabase')
  .connect('mongodb+srv://yeisonrealnetwork:p01Q0JxfvkAgNirU@cluster0.1bqop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected  SIIII! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/students', studentRoute)

// PORT
const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});