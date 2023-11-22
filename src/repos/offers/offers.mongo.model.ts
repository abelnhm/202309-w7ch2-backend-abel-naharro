import { Schema, model } from 'mongoose';
import { Offer } from '../../entities/offers';

// Crear el modelo de datos
const offersSchema = new Schema<Offer>({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  author: {
    // Relacion n-m con varios usuarios tendria que ser [{...}] indicando que pueden ser varios usuarios.
    /*
    [{
    type: Schema.Types.ObjectId, // Tipo de dato ObjectId
    ref: 'User', // Relacionar con el modelo de usuarios User (UserModel)
    required: true,
    }]
    */
    // Relacionar con el Schema de usuarios
    type: Schema.Types.ObjectId, // Tipo de dato ObjectId
    ref: 'User', // Relacionar con el modelo de usuarios User (UserModel)
    required: true,
  },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  dateEnd: { type: Number, required: true },
});

// Explicación de la siguiente línea:
/*
  set es un método de mongoose que permite modificar el comportamiento de un modelo.
  toJSON es un método que se ejecuta cuando se serializa un documento a JSON.
  transform es un método que permite modificar el objeto que se serializa.
  _doc es el documento que se serializa.
  returnedObject es el objeto que se devuelve.
  delete returnedObject._id; elimina la propiedad _id del objeto que se devuelve.
  delete returnedObject.__v; elimina la propiedad __v del objeto que se devuelve.
  delete returnedObject.passwd; elimina la propiedad passwd del objeto que se devuelve.
*/

offersSchema.set('toJSON', {
  transform(_doc, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const OfferModel = model<Offer>('Offer', offersSchema, 'offers');
