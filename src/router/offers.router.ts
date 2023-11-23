import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { OffersController } from '../controller/offers.controller.js';
import { OffersMongoRepo } from '../repos/offers/offers.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W7E:router');

export const offersRouter = createRouter();
debug('Starting');

const repo = new OffersMongoRepo();
const controller = new OffersController(repo);
const interceptor = new AuthInterceptor();

offersRouter.get(
  '/',
  // Interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);
offersRouter.get('/:id', controller.getById.bind(controller));
offersRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);
offersRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  // Interceptor.authentication.bind(interceptor),
  controller.update.bind(controller)
);
offersRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  // Interceptor.authentication.bind(interceptor),
  controller.delete.bind(controller)
);
