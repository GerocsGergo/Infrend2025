import { AppDataSource } from "./data-source";
import express from 'express';
import 'reflect-metadata';
import { router } from "./routes";  // Assuming you have a separate router module

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');

        const app = express();

        app.use(express.json());

        app.use('/api', router);

        app.listen(3000, (err) => {
            if (err) {
                console.error('Error starting server:', err);
                return;
            }
            console.log('Server running on http://localhost:3000');
        });
    } catch (err) {
        console.error('Error initializing app:', err);
    }
}

main();
