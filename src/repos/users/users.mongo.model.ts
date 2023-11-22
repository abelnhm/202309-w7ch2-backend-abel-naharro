import { Schema, model } from 'mongoose';
import { User } from '../../entities/user.js';

// Crear el modelo de datos
const usersSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  passwd: { type: String, required: true },
  name: { type: String, required: true },
  surname: String, // Una sola propiedad typo se puede indicar así
  age: Number,
  /*
  Podemos añadir el array e ofertas que tiene un usuario para ver las ofertas
  que ha creado dentro del mismo user.
  */
  offers: [
    {
      type: Schema.Types.ObjectId, // Tipo de dato ObjectId
      ref: 'Offer', // Relacionar con el modelo de ofertas Offer (OfferModel)
    },
  ],
});

usersSchema.set('toJSON', {
  transform(_doc, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model<User>('User', usersSchema, 'users');
