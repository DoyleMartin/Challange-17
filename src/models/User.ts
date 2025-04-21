import { Schema, Document, Types, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount?: number;
}

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User' 
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Create a virtual for friendCount
userSchema.virtual('friendCount').get(function (this: { friends: Array<any> }) {
  return this.friends.length;
});

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;