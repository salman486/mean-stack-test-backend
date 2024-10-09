import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface UserDocument extends Document {
  userId: string;
  name: string;
  externalId: string;
  provider: string;
  email: string;
  rawData?: any;
}

const userSchema = new Schema({
  _id: {
    type: Schema.Types.String,
    default: () => uuidv4(),
  },
  userId: {
    type: Schema.Types.String,
    default: () => uuidv4(),
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  externalId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  rawData: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
