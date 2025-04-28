import express from 'express';
import {VersionController} from './controllers/version.controller'
import { Router } from 'express';

const router = Router();

const versionController = new VersionController();

router.get('/version', versionController.getVersion)

export { router };