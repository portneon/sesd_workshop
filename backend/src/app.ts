import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';



interface App_Interface {
    startServer(): void;
    connectDatabase(): void;
    initialiseRoutes(): void;

}


class App implements App_Interface {


    PORT: number;
    app: express.Application;
    constructor(port: number) {
        this.PORT = port || 3000;
        this.app = express();
        this.initialiseRoutes();
        this.connectDatabase();
    }

    startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log('server is on port', this.PORT)
        })
    }
    async connectDatabase(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_URI as string)
            console.log('Database connected')
        }
        catch (err) {
            console.log('Error while connecting', err)

        }
    }
    initialiseRoutes(): void {
        const cors = require('cors');
        const morgan = require('morgan');
        const todoRoutes = require('./routes/todo.routes').default;

        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use('/api', todoRoutes);
    }
}


export default App;


