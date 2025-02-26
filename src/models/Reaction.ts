import { Schema, Types } from 'mongoose';

// Define TypeScript interface for Reaction
export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Schema for Reaction
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: unknown) => {
        return timestamp ? new Date(timestamp as number).toLocaleString() : '';
      },
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

export default reactionSchema;
