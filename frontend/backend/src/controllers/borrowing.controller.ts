import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Borrowing } from '../entity/Borrowing';
import { isValidSorszam,isValidAzonosito, isValidKolcsonzesDatuma
} from '../validators/borrowingValidator';
import { Customer } from '../entity/Customer';
import { Media } from '../entity/Media';


export class BorrowingController{
    private borrowingTable: Repository<Borrowing>;
    private customerTable: Repository<Customer>;
    private mediaTable: Repository<Media>;
            constructor(dataSource) {
                this.borrowingTable = dataSource.getRepository(Borrowing);
                this.customerTable = dataSource.getRepository(Customer);
                this.mediaTable = dataSource.getRepository(Media);
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

        findCustomerToBorrowing = async(req, res) => {
            try {
                
              const { azonosito } = req.query;
              let customer = null;
          
              if (azonosito && azonosito != 0) {
                if (!isValidAzonosito(azonosito)) {
                  return res.status(400).json({ message: 'Nem érvényes azonosito.' });
                }
                customer = await this.customerTable.find({
                  where: {azonosito: Number(azonosito)},
                  order: {azonosito: 'ASC'} 
                });
              }
              else {
                return res.status(400).json({ message: 'Nincs megadva keresési feltétel' });
              }
          
              if (!customer || (Array.isArray(customer) && customer.length === 0)) {
                return res.status(404).json({ message: 'Nincs ilyen ügyfél' });
              }
          
              res.json(customer);

            } catch (err) {
                this.handleError(res, err);
            }
        };

        findMediaToBorrowing = async(req, res) => {
          try {
              
            const { sorszam } = req.query;
            let media = null;
        
            if (sorszam && sorszam != 0) {
              if (!isValidSorszam(sorszam)) {
                return res.status(400).json({ message: 'Nem érvényes sorszám.' });
              }
              media = await this.mediaTable.find({
                where: {sorszam: Number(sorszam)},
                order: {sorszam: 'ASC'} 
              });

            }
            else {
              return res.status(400).json({ message: 'Nincs megadva keresési feltétel' });
            }
        
            if (!media || (Array.isArray(media) && media.length === 0)) {
              return res.status(404).json({ message: 'Nincs ilyen médiaügyfél' });
            }


        
            res.json(media);

          } catch (err) {
              this.handleError(res, err);
          }
        };

        deleteBorrowing = async (req,res) => { // a borrowing tablaba be kell állítani a visszahozas datumat
                try {
                  const sorszam = req.params['sorszam'];
              
                  if (!isValidAzonosito(sorszam)) {
                    return res.status(400).json({ message: 'Érvénytelen sorszám.' });
                  }
              
                  const media = await this.mediaTable.findOneBy({ sorszam: Number(sorszam) });
              
                  if (!media) {
                    return res.status(404).json({ message: 'Nincs ilyen média.' });
                  }

                  // media statusz ne legyen selejtezett
              if (media.statusz === 'selejtezett') {
                return res.status(400).json({ message: 'Nem lehet törölni mert leselejtezett a média.' });
              }

              
                  media.statusz = 'szabad';
                  await this.mediaTable.save(media);
              
                  
                  // Megkeressük az aktív kölcsönzést ehhez a médiához (visszahozas_datuma null)
                  const borrowing = await this.borrowingTable.findOne({
                    where: {
                      media: { sorszam: Number(sorszam) },
                      visszahozas_datuma: null
                    },
                    relations: ['media', 'customer']
                  });

                  if (borrowing) {
                    borrowing.visszahozas_datuma = new Date();
                    await this.borrowingTable.save(borrowing);
                  }

                  res.json({
                    message: 'A média visszahozva és kölcsönzés lezárva.',
                    media,
                    borrowing
                  });

                } catch (err) {
                  this.handleError(res, err);
                }

        };      

        createBorrowing = async (req, res) => {
          try {
            const { sorszam, azonosito, kolcsonzes_datuma } = req.body;
        
            if (!sorszam || !azonosito || !kolcsonzes_datuma) {
              return res.status(400).json({ message: 'A három adat megadása kötelező.' });
            }
        
            if (!isValidSorszam(sorszam)) {
              return res.status(400).json({ message: 'Érvénytelen sorszám.' });
            }
        
            if (!isValidAzonosito(azonosito)) {
              return res.status(400).json({ message: 'Érvénytelen azonosító.' });
            }
        
            if (!isValidKolcsonzesDatuma(kolcsonzes_datuma)) {
              return res.status(400).json({ message: 'Érvénytelen dátum.' });
            }
            

              const media = await this.mediaTable.findOneBy({ sorszam });
              if (!media) {
                return res.status(404).json({ message: 'A megadott sorszámhoz nem található média.' });
              }

              if (media.statusz === 'kikölcsönzött') {
                return res.status(400).json({ message: 'A média már ki van kölcsönözve.' });
              }

              if (media.statusz === 'selejtezett') {
                return res.status(400).json({ message: 'A média selejtezett, nem lehet kikölcsönözni.' });
              }

              const customer = await this.customerTable.findOneBy({ azonosito });
              if (!customer) {
                return res.status(404).json({ message: 'A megadott azonosítóhoz nem található ügyfél.' });
              }

              const newBorrowing = this.borrowingTable.create({
                media,
                customer,
                kolcsonzes_datuma: new Date(kolcsonzes_datuma),
              });
        
            await this.borrowingTable.save(newBorrowing);
              
            media.statusz = 'kikölcsönzött';
            await this.mediaTable.save(media);

            res.json({ message: 'Új kölcsönzés sikeresen hozzáadva!', borrowing: newBorrowing });
        
          } catch (err) {
            this.handleError(res, err);
          }          
        };
      
        getLateBorrowings = async (req, res) => {
          try {
            const limit = req.params['limit'] || 1; // alapból 1 nap
        
            const borrowings = await this.borrowingTable //ember már én se értem milyez
              .createQueryBuilder('borrowing')
              .leftJoinAndSelect('borrowing.media', 'media')
              .leftJoinAndSelect('borrowing.customer', 'customer')
              .where('media.statusz = :statusz', { statusz: 'kikölcsönzött' })
              .andWhere('borrowing.visszahozas_datuma IS NULL')
              .orderBy('borrowing.kolcsonzes_datuma', 'ASC')
              .getMany();
        
              const today = new Date();
              
              const results = borrowings   //ezt meg pláne 
              .filter(borrowing => {
                const kolcsonzesDatuma = new Date(borrowing.kolcsonzes_datuma);
                const diffTime = today.getTime() - kolcsonzesDatuma.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > limit;
              })
              .map(borrowing => ({
                id: borrowing.id,
                kolcsonzes_datuma: borrowing.kolcsonzes_datuma,
                visszahozas_datuma: borrowing.visszahozas_datuma,
                media: {
                  sorszam: borrowing.media.sorszam,
                  cim: borrowing.media.cim,
                  beszerzes_datuma: borrowing.media.beszerzes_datuma,
                  tipus: borrowing.media.tipus,
                  statusz: borrowing.media.statusz,
                },
                customer: {
                  azonosito: borrowing.customer.azonosito,
                  nev: borrowing.customer.nev,
                  telefonszam: borrowing.customer.telefonszam,
                  szemelyiszam: borrowing.customer.szemelyiszam,
                  lakcim: borrowing.customer.lakcim,
                  statusz: borrowing.customer.statusz,
                }
              }));   
        
            res.json(results);
        
          } catch (err) {
            this.handleError(res, err);
          }
        };
        
        getLateBorrowings2 = async (req, res) => {
          try {
            const limit = Number(req.params['limit']) || 1;
        
            const borrowings = await this.borrowingTable
              .createQueryBuilder('borrowing')
              .leftJoinAndSelect('borrowing.media', 'media')
              .leftJoinAndSelect('borrowing.customer', 'customer')
              .where('media.statusz = :statusz', { statusz: 'kikölcsönzött' })
              .andWhere('borrowing.visszahozas_datuma IS NULL')
              .orderBy('borrowing.kolcsonzes_datuma', 'ASC')
              .getMany();
        
            const today = new Date();
        
            const results = borrowings
              .map(borrowing => {
                const kolcsonzesDatuma = new Date(borrowing.kolcsonzes_datuma);
                const diffTime = today.getTime() - kolcsonzesDatuma.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                return { id: borrowing.id, daysLate: diffDays };
              })
              .filter(item => item.daysLate > limit);
        
            res.json(results);
        
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