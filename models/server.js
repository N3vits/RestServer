import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { router } from '../routes/user.routes.js';
import { router as auth } from '../routes/auth.routes.js';
import { dbConnection } from '../db/config.js';
dotenv.config();

export class Server {
    constructor(){
        this.PORT = process.env.PORT
        this.app = express();
        //Connection
        this.connectionDB();
        //Middleware
        this.middleware();
        //Routing
        this.routing();
    }

    async connectionDB() {
        await dbConnection();
    }

    middleware() {
        this.app.use(morgan('dev'))
        this.app.use(express.static('public'))
        this.app.use(cors())
        this.app.use(express.json())
    }
    routing() {
        this.app.use('/api/users', router);
        this.app.use('/api/auth', auth)
    }

    listing() {
        this.app.listen(this.PORT, ()=>{
            console.log(`Server listing on port ${this.PORT}`);
        })
    }
}