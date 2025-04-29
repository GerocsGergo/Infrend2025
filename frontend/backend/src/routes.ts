import express from 'express';
import {VersionController} from './controllers/version.controller'
import { Router } from 'express';
import { TestController } from './controllers/test.controller';
import { AppDataSource } from './data-source';

const router = Router();

const versionController = new VersionController();
const testController = new TestController(AppDataSource);

router.get('/version', versionController.getVersion);
router.get('/getOneUser', testController.getOneUser);

export { router };