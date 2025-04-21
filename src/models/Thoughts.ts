import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Types.ObjectId[];
    reactionCount?: number;
}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: Date) => createdAt.toISOString().split('T')[0]
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function (this: { reactions: Array<any> }) {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;