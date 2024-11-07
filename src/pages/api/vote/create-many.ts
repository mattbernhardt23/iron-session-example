import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
import User from "@models/User";
import Vote from "@models/Vote";
import { NextApiRequest, NextApiResponse } from "next";

// Helper function to generate a random vote type
const getRandomVoteType = () => (Math.random() < 0.5 ? "up" : "down");

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      await dbConnect();

      // Get all user IDs
      const users = await User.find().select("_id");
      const userIds = users.map((user) => user._id);

      // Get all topic IDs
      const topics = await Topic.find().select("_id");
      const topicIds = topics.map((topic) => topic._id);

      // Array to hold all vote documents
      const votes = [];

      // Loop through each user and each topic to generate a vote
      for (const userId of userIds) {
        for (const topicId of topicIds) {
          const voteType = getRandomVoteType();

          votes.push({
            userId,
            topicId,
            voteType,
            votedAt: new Date(),
          });
        }
      }

      // Bulk insert all votes
      await Vote.insertMany(votes);

      return response.status(200).json({ success: true, message: "Votes generated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        success: false,
        message: "Error generating votes",
      });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
