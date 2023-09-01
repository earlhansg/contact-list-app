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
      type: String
    },
    telephoneNumber: {
      type: Number
    },
    favoriteFlag: {
      type: String
    },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = model<IContact>("Contact", contactSchema);

export { Contact, IContact };
