import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Borrowing } from '../entity/Borrowing';
import { isValidSorszam,isValidAzonosito
} from '../validators/borrowingValidator';


export class BorrowingController{
    private borrowingTable: Repository<Borrowing>;
            constructor(dataSource) {
                this.borrowingTable = dataSource.getRepository(Borrowing);
            };

        getCustomerBorrowings = async(req, res) => { //beolvassa az ugyfel osszes kolcsonzését
            try {
                 const azonosito = req.params['azonosito'];
                
                    if (!isValidAzonosito(azonosito)) {
                      return res.status(400).json({ message: 'Érvénytelen azonosító.' });
                    }

                    const borrowings = await this.borrowingTable.find({
                        where: { customer: { azonosito: Number(azonosito) } },
                        relations: ['customer', 'media'], // a kapcsolt entitások betöltéséhez lol
                      });
                
                    res.json(borrowings);
                
                } catch (err) {
                    this.handleError(res, err);
                }   
        }; 



    handleError = (res: Response, err: any, status = 500, message = 'Ismeretlen szerver hiba.') => {
        if (err) {
            console.error(err);
        }
        res.status(status).json({ message });
    };

}