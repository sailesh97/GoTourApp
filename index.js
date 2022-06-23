import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { logger } from './src/utilities/logger';
import routes from './src/routes/routes';

// variable declaration
const app = express();
const PORT = 8000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/goTourAppDB', { useNewUrlParser: true });

// configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type:"application/json"}));

routes(app);

app.listen(PORT, () => {
    logger.info(`GoTourApp Server started at port: ${PORT}`);
})