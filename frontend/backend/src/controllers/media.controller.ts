import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Media } from '../entity/Media';
import { isValidSorszam,isValidCim,isValidTipus,isValidStatusz,isValidDatum 
} from '../validators/mediaValidator';


export class MediaController{
    private mediaTable: Repository<Media>;
            constructor(dataSource) {
                this.mediaTable = dataSource.getRepository(Media);
            };

    getAllMedia = async(req, res) => {
        try{
            const medias = await this.mediaTable.find();

            if (!medias) {
                res.status(404).json({ message: 'Hiba történt az adatok lekérésében' });
                return;
            }

            res.json(medias);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    openMedia = async(req, res) => {
            try {
                 const sorszam = req.params['sorszam'];
                
                    if (!isValidSorszam(sorszam)) {
                      return res.status(400).json({ message: 'Érvénytelen sorszám.' });
                    }
        
                    const media = await this.mediaTable.findOneBy({ sorszam: Number(sorszam) });
                
                    if (!media) {
                      return res.status(404).json({ message: 'Nincs ilyen média.' });
                    }
                
                    res.json(media);
                
                } catch (err) {
                    this.handleError(res, err);
                }   
        }; 

    createMedia = async(req, res) => {

    };

    modifyMedia = async (req, res) => {
        try {
          const sorszam = req.params['sorszam'];
 
          if (!isValidSorszam(sorszam)) {
            return res.status(400).json({ message: 'Érvénytelen sorszám.' });
          }
      
          const media = await this.mediaTable.findOneBy({ sorszam: Number(sorszam) });
      
          if (!media) {
            return res.status(404).json({ message: 'Nincs ilyen média.' });
          }
      
          const { cim, beszerzes_datuma, tipus} = req.body;
      
          if (cim !== undefined) {
            if (!isValidCim(cim)) {
              return res.status(400).json({ message: 'Érvénytelen cím.' });
            }
            media.cim = cim;
          }
      
          if (beszerzes_datuma !== undefined) {
            if (!isValidDatum(beszerzes_datuma)) {
              return res.status(400).json({ message: 'Érvénytelen beszerzési dátum.' });
            }
            media.beszerzes_datuma = new Date(beszerzes_datuma);
          }
      
          if (tipus !== undefined) {
            if (!isValidTipus(tipus)) {
              return res.status(400).json({ message: 'Érvénytelen típus.' });
            }
            media.tipus = tipus;
          }
      
      
          // Mentés
          await this.mediaTable.save(media);
      
          res.json({ message: 'Média adatai sikeresen frissítve!', media });
      
        } catch (err) {
          this.handleError(res, err);
        }
      };
      

    deleteMedia = async(req, res) => {
        try {
          const sorszam = req.params['sorszam'];

          if (!isValidSorszam(sorszam)) {
            return res.status(400).json({message: 'Érvénytelen sorszám'});
          }

          const media = await this.mediaTable.findOneBy({ sorszam: Number(sorszam)});
          
          if (!media) {
            return res.status(404).json({message: 'Nincs ilyen média'});
          }

          media.statusz = 'selejtezett';
          await this.mediaTable.save(media);

          res.json({message: 'A média státusza sikeren módosítva: selejtezett', media});

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