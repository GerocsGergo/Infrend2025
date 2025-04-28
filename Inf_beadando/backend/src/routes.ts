import express from 'express';
import {VersionController} from './controllers/version.controller'

export const router = express.Router();

const versionController = new VersionController();

router.get('/version', versionController.getVersion)