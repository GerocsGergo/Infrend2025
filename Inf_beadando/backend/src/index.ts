import { AppDataSource } from "./data-source"
import express from 'express';
import { router } from "./routes";

async function main() {
    await AppDataSource.initialize();

    const app = express();

    app.use(express.json());

    app.use('/api', router);

    app.listen(3306, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Server is listening on 3306 ...');
    });
}



