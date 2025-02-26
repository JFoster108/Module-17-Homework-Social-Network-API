import { Schema, model, Document } from 'mongoose';
import reactionSchema, { IReaction } from './Reaction';

// Define TypeScript interface for Thought
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Schema for Thought
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: unknown) => {
        return timestamp ? new Date(timestamp as number).toLocaleString() : '';
      },
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

// Create Thought model
const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
