import { Repository } from "typeorm";

export class VersionController {
    repository: Repository<any>;

    getVersion = async (res) => {
        try {
            //const entities = await this.repository.find();
            //res.json(entities);
            res.json("0.0.0");
        } catch (err) {
            this.handleError(res, err);
        }
    };

    handleError = (res, err, status = 500, message = 'Unknown server error.') => {
        if (err) {
            console.error(err);
        }

        res.status(status).json({ message });
    }

}