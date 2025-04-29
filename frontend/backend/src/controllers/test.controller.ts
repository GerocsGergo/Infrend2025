import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entity/User';

export class TestController {
    private userTable: Repository<User>;
    constructor(dataSource) {
        this.userTable = dataSource.getRepository(User);
      }
    
    getOneUser = async (req, res) => {
        try {
            const id = req.params['id'];
            const user = await this.userTable.findOneBy({ id: id });

            if (!user) {
                res.status(404).json({ message: 'The given id does not exist.' });
                return;
            }

            res.json(user);
        } catch (err) {
            this.handleError(res, err);
        }
    }  

    handleError = (res: Response, err: any, status = 500, message = 'Unknown server error.') => {
        if (err) {
            console.error(err);
        }
        res.status(status).json({ message });
    }
}