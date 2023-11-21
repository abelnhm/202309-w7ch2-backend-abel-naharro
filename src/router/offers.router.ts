import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { OffersController } from '../controller/offers.controller.js';
import { OffersMongoRepo } from '../repos/offers.mongo.repo.js';

const debug = createDebug('W7E:router');

export const offersRouter = createRouter();
debug('Starting');

const repo = new OffersMongoRepo();
const controller = new OffersController(repo);

offersRouter.get('/', controller.getAll.bind(controller));
offersRouter.get('/:id', controller.getById.bind(controller));
offersRouter.post('/', controller.create.bind(controller));
offersRouter.patch('/:id', controller.update.bind(controller));
offersRouter.delete('/:id', controller.delete.bind(controller));
