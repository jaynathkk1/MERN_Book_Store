import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { mongoDBURL, PORT } from './config.js';
import booksRoute from './routes/booksRoute.js'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS(Cross-Origin Resource Sharing) POLICY
//option 1: Allow All origins with Default cors(*)
app.use(cors());

//Option 2: Allow cutom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         methods: ['POST','GET','PUT','DELETE'],
//         allowedHeaders: ['content-type'],
// }));

// app.use('/',(req,res)=>{
//     console.log(req);
//     res.status(234).send('Welcome To MERN Stack Project')
// })


app.use('/books',booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('Application connected to database');

    app.listen(PORT,() => {
        console.log(`server running at http://localhost:${PORT}`);
    });
}).catch((error) => {console.log(error)});