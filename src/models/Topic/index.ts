import mongoose, { Schema } from "mongoose";
import { Users } from "@models/User";
import { Argument, ArgumentSchema } from "@models/Argument";

export interface Topics extends mongoose.Document {
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
  title: string;
  description: string;
  args: Argument[];
  up_votes: number;
  down_votes: number;
  date_created: Date;
}

const TopicSchema = new mongoose.Schema<Topics>({
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
  title: { type: String, required: true },
  description: { type: String, required: false },
  date_created: { type: Date, required: false, default: new Date() },
  up_votes: { type: Number, default: 0 },
  down_votes: { type: Number, default: 0 },
  args: [ArgumentSchema],
});

export default mongoose.models.Topic ||
  mongoose.model<Topics>("Topic", TopicSchema);
