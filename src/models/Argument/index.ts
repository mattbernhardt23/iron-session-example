import mongoose, { Schema } from "mongoose";
import { Users } from "@models/User";
 
export interface Argument extends mongoose.Document {
  creator: {
    _id: Users,
    name: {
      title: string;
      first: string;
      last: string;
    };
    img: {
      large: string;
      medium: string;
      thumbnail: string;
    },
  } 
    supporting: boolean;
    title: string;
    up_votes: number;
    down_votes: number;
    description: string;
    supports: Argument[];
    objections: Argument[];
    date_created: Date;
}

const ArgumentSchema = new Schema<Argument>({
  creator: {
    _id : { type: Schema.Types.ObjectId, ref: "Users", required: true },
    name: {
      title: { type: String, required: true },
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    img: {
      large: { type: String, required: true },
      medium: { type: String, required: true },
      thumbnail: { type: String, required: true },
    },
  },
    supporting: { type: Boolean, required: true },
    title: { type: String, required: true },
    up_votes: { type: Number, default: 0 },
    down_votes: { type: Number, default: 0 },
    description: { type: String, required: true },
    date_created: { type: Date, default: Date.now }
});
 
export default mongoose.models.Argument ||
  mongoose.model<Argument>("Argument", ArgumentSchema);

export { ArgumentSchema };

