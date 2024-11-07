import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
import Argument from "@models/Argument";
import User from "@models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PUT") {
    try {
      const data = request.body;
      const { user_id, topic_id, up_votes, down_votes } = data;

      await dbConnect();

      // Find the Topic in the Database
      const topic = await Topic.findById(topic_id);
      if (!topic) {
        return response.status(404).json({
          success: false,
          message: "Topic not found",
        });
      }

      // Find the User to Create the Creator Object
      const user = await User.findById(user_id);
      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check the List of Topic IDs the user has voted for
      if (
        topic.up_vote_ids.includes(user_id) ||
        topic.down_vote_ids.includes(user_id)
      ) {
        return response.status(400).json({
          success: false,
          message: "User has already voted for this topic",
        });
      }

      // Figure out if the vote is an up vote or a down vote
      if (up_votes - topic.up_votes === 1) {
        topic.up_votes = up_votes;
        topic.up_vote_ids.push(user_id);
      } else if (down_votes - topic.down_votes === 1) {
        topic.down_votes = down_votes;
        topic.down_vote_ids.push(user_id);
      }
      await topic.save();

      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: "An error occurred while updating the topic vote",
      });
    }
  } else {
    response.setHeader("Allow", ["PUT"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
