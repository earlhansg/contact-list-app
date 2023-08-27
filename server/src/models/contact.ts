import mongoose, { Model, Schema, model } from "mongoose";

interface IContact extends Document {
  name: string;
  email: string;
  telephoneNumber: number;
  favoriteFlag: string;
}

const contactSchema: Schema<IContact> = new Schema<IContact>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    telephoneNumber: {
      type: Number,
      require: true,
    },
    favoriteFlag: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = model<IContact>("Contact", contactSchema);

export { Contact, IContact };
