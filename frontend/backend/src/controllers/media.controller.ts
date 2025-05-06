import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Media } from '../entity/Media';


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

    createMedia = async(req, res) => {

    };

    modifyMedia = async(req, res) => {

    };

    deleteMedia = async(req, res) => {
        
    };

    handleError = (res: Response, err: any, status = 500, message = 'Ismeretlen szerver hiba.') => {
        if (err) {
            console.error(err);
        }
        res.status(status).json({ message });
    };

}