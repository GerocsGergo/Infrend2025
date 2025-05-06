import express from 'express';
import {VersionController} from './controllers/version.controller'
import { Router } from 'express';
import { AppDataSource } from './data-source';
import { CustomerController } from './controllers/customer.controller';
import { MediaController } from './controllers/media.controller';

const router = Router();

//Version
const versionController = new VersionController();
router.get('/version', versionController.getVersion);


//Customer
const customerController = new CustomerController(AppDataSource);
router.get('/getAllCustomer', customerController.getAllCustomer);
router.get('/findCustomers', customerController.findCustomers);
router.put('/modifyCustomer/:azonosito', customerController.modifyCustomer);
router.put('/deleteCustomer/:azonosito', customerController.deleteCustomer);
router.put('/activateCustomer/:azonosito', customerController.activateCustomer);
router.get('/openCustomer/:azonosito', customerController.openCustomer);
router.post('/createCustomer', customerController.createCustomer);



//Media
const mediaController = new MediaController(AppDataSource);
router.get('/getAllMedia', mediaController.getAllMedia);
router.post('/createMedia', mediaController.createMedia);
router.put('/deleteMedia/:sorszam', mediaController.deleteMedia);
router.put('/modifyMedia/:sorszam', mediaController.modifyMedia);
router.get('/openMedia/:sorszam', mediaController.openMedia);


export { router };