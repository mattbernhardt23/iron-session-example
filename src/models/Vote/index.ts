import mongoose, { Schema, Document } from "mongoose";
import { Users } from "@models/User";
import { Topics } from "@models/Topic";

// Define the interface for the Vote document
export interface Vote extends Document {
  userId: Users;          // Reference to the user who voted
  topicId: Topics;        // Reference to the topic being voted on
  voteType: "up" | "down"; // Type of vote, either "up" or "down"
  votedAt: Date;          // Timestamp of the vote
}

// Define the Vote schema
const VoteSchema = new mongoose.Schema<Vote>({
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  topicId: { type: Schema.Types.ObjectId, ref: "Topics", required: true },
  voteType: { type: String, enum: ["up", "down"], required: true },
  votedAt: { type: Date, default: Date.now },
});

// Add a compound index to ensure each user can only vote once per topic
VoteSchema.index({ userId: 1, topicId: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model<Vote>("Vote", VoteSchema);
