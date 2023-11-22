import { Offer } from '../../entities/offers.js';
import { OfferModel } from './offers.mongo.model.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../users/users.mongo.repo.js';

const debug = createDebug('W7E:mongo:repo');

export class OffersMongoRepo implements Repository<Offer> {
  userRepo: UsersMongoRepo;

  constructor() {
    debug('Instantiated');
    this.userRepo = new UsersMongoRepo();
  }

  async getAll(): Promise<Offer[]> {
    /* 
    Exec sirve para ejecutar la query y convertir el resultado en una promesa,
    como indicamos que tiene que devolver el metodo devuelve el metodo
    */
    const result = await OfferModel.find()
      // .populate('author', { age: 0 }) //ocultar age
      // .populate('author', { email: 1 }) //solo mostrar email
      .populate('author', { offers: 0 })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Offer> {
    const result = await OfferModel.findById(id)
      .populate('author', { offers: 0 })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Offer, 'id'>): Promise<Offer> {
    newItem.author = await this.userRepo.getById(newItem.author.id);

    const result: Offer = await OfferModel.create(newItem);
    
    return result;
  }

  async update(id: string, updatedItem: Partial<Offer>): Promise<Offer> {
    const result = await OfferModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', { offers: 0 })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await OfferModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
