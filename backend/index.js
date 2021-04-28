import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import registryRouter from './src/routes/registryRouter.js';
import settingsRouter from './src/routes/settings.js'


const port = 3001;

const app = express();


// third party middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Add routers to app
app.use("/", registryRouter);
app.use("/", settingsRouter);


// Hello world
app.get('/', (request, response) => {
    response.json({ info: 'It works!' })
});


app.listen(port, () => {
    console.log(`running on port ${port}.`)
});
