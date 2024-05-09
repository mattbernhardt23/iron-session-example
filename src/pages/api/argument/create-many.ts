import dbConnect from "@lib/dbConnect";
import Argument from "@models/Argument";
import Topic from "@/models/Topic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const data = await request.body;
      const args = [];

      await dbConnect();

      for (let i = 0; i < data.length; i++) {
        const { creator_id, title, description, topic_id, supporting } =
          data[i];

        const topic = await Topic.findById(topic_id);
        const arg = await Argument.create({
          topic_id,
          creator_id,
          title,
          description,
          supporting
        });

        await arg.save();

        if (supporting === true) {
          topic.supports.push(arg);
        } else {
          topic.objections.push(arg);
        }
        await topic.save();

        args.push(arg);
      }

      return response.status(200).json(args);
    } catch (error) {
      return response.status(400).json({
        success: false,
      });
    }
  }
}
