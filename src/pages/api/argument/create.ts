import dbConnect from "@lib/dbConnect";
import Argument from "@models/Argument";
import Topic from "@/models/Topic";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const data = await request.body;

      await dbConnect();

      const { creator_id, title, description, topic_id, supporting } = data;

      const topic = await Topic.findById(topic_id);
      const user = await User.findById(creator_id)
      const arg = await Argument.create({
        topic_id,
        creator_id,
        title,
        description,
        supporting,
      });

      await arg.save();

      if (supporting === true) {
        topic.supports.push(arg);
      } else {
        topic.objections.push(arg);
      }
      await topic.save();

      user.arguments.push(arg);
      await user.save();

      return response.status(200).json(arg);
    } catch (error) {
      return response.status(400).json({
        success: false,
      });
    }
  }
}
