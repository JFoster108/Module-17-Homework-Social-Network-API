import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for User
export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  friendCount: number;
}

// Schema for User
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Virtual to get friend count
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

// Create User model
const User = model<IUser>('User', userSchema);
export default User;
