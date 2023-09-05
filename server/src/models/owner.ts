import mongoose, { Model, Schema, model } from "mongoose";

interface IOwner extends Document {
  name: string;
  favorites?: string[]
}

const ownerSchema: Schema<IOwner> = new Schema<IOwner>(
  {
    name: {
      type: String,
      require: true,
    },
    favorites: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

const Owner: Model<IOwner> = model<IOwner>("Owner", ownerSchema);

export { Owner, IOwner };
