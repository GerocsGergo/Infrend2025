import express from 'express';
import {VersionController} from './controllers/version.controller'
import { Router } from 'express';
import { TestController } from './controllers/test.controller';
import { AppDataSource } from './data-source';
import { CustomerController } from './controllers/customer.controller';

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



//Product

//FOR the tests
const testController = new TestController(AppDataSource);

router.get('/getOneUser/:id', testController.getOneUser);
router.get('/getAllUser', testController.getAllUser);

export { router };