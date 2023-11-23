import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import createDebug from 'debug';
// Import { OffersMongoRepo } from '../repos/offers/offers.mongo.repo.js';
const debug = createDebug('W7E:auth:interceptor:middleware');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('authorization');
      if (!tokenHeader!.startsWith('Bearer '))
        throw new HttpError(401, 'Unauthorized', 'Login not possible');
      const token = tokenHeader?.split(' ')[1];
      const tokenPayload = Auth.verifyJWT(token!);
      req.body.id = tokenPayload.id;

      next();
    } catch (error) {
      next(error);
    }
  }

  // Async authentication(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // Eres el usuario que quieres modificar
  //     const userID = req.body.id;
  //     // Queres actuar sobre la oferta req.body.id
  //     const OfferID = req.params.id;

  //     const repoOffers = new OffersMongoRepo();
  //     const offer = await repoOffers.getById(OfferID);

  //     if (offer.id !== userID) throw new HttpError(401, 'Unauthorized');
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
