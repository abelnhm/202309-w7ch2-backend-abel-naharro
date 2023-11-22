import { UserModel } from './users.mongo.model.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { LoginUser, User } from '../../entities/user.js';
import { Auth } from '../../services/auth.js';

const debug = createDebug('W7E:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  // Metodo de login
  async login(loginUser: LoginUser): Promise<User> {
    // Find() siempre devuelve un array de resultados y si no encuentra nada devuelve un array vacio.
    // findOne() devuelve un objeto o null si no encuentra nada.
    const result = await UserModel.findOne({ email: loginUser.email }).exec();
    // Si no encuentra nada o la contraseña no coincide lanzamos un error.
    if (!result || !(await Auth.compare(loginUser.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized', 'Login not possible');
    // Si todo va bien devolvemos el usuario.
    return result;
  }

  async getAll(): Promise<User[]> {
    // Populate sirve para rellenar los campos que son de tipo ObjectId con
    // los datos de la entidad a la que pertenecen.
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    newItem.passwd = await Auth.hash(newItem.passwd);
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
