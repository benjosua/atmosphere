import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import logger from "morgan";
import { config } from "dotenv";
config();

/* dirname handler */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/* Import Routes */
import home from "./routes/home.js";
import callback from "./routes/callback.js";
import error from "./routes/error.js";
import login from "./routes/login.js";
import refresh from "./routes/refresh.js";
import contribute from "./routes/contribute.js";
import cors from "cors";

/*  database */

// import database from "./models/database.js";

const server = process.env.DB_SERVER || 'localhost:27017'
const database = process.env.DB_NAME || 'atmosphere'
const PORT = 5000;

class Database {
  constructor() {
    this._connect()
  }
_connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
    // mongoose.connect(`mongodb://localhost:27017/atmosphere`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error(err + 'Database connection error')
       })
  }
}



/* Instansiate the App */
var app = express()

/* App setup */
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

/* View Engine setup */
app.set('view engine','pug');
app.set('views', path.join(__dirname, './views'))
// console.log(fileURLToPath(import.meta.url))


/* Routes setup */
app.use('/', home);
app.use('/callback', callback);
app.use('/error', error);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/contribute', contribute);

app.get('*',function (req, res) {
  res.redirect('/');
});

/* Error Handlers */
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

/* Start the server */

app.listen(PORT, () => 
    console.log(`Server running at http://localhost:${PORT}`)
);

export default new Database()