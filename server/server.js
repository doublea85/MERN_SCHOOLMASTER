import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';


const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 3001;

/** HTTP Get request */
app.get('/', (req, res) => {
    res.status(201).json("Home get request");
});

/** Api route every route start with "api" */
app.use('/api', router )

/** Start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
        
    } catch (error) {
        console.log('Can not connect to the server');
    }
}).catch(error => {
    console.log("Invalide database connetion...!")
})