import { InferSchemaType, model, Schema } from 'mongoose';

const favoriteSchema = new Schema({
  pokeApiId: { type: Number, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export type Favorite = InferSchemaType<typeof favoriteSchema>;

export default model<Favorite>('Favorite', favoriteSchema);
