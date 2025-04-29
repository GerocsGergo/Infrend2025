import express from 'express';
import {VersionController} from './controllers/version.controller'
import { Router } from 'express';
import { TestController } from './controllers/test.controller';
import { AppDataSource } from './data-source';

const router = Router();

const versionController = new VersionController();


router.get('/version', versionController.getVersion);

//FOR the tests
const testController = new TestController(AppDataSource);

router.get('/getOneUser/:id', testController.getOneUser);
router.get('/getAllUser', testController.getAllUser);

export { router };