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
      const data = await request.body;
      console.log("data: ", data)
      const { creator_id, topic_id, supporting, title, description } = data;

      await dbConnect();

      //   Find the Topic in the Database
      const topic = await Topic.findById(topic_id);
      console.log("topic_id: ", topic_id)
      const user = await User.findById(creator_id);
      console.log("user_id: ", creator_id)
      // Create the Creator Object
      const creator = {
        _id: user._id,
        name: {
          title: user.name.title,
          first: user.name.first,
          last: user.name.last,
        },
        img: {
          large: user.picture.large,
          medium: user.picture.medium,
          thumbnail: user.picture.thumbnail,
        },
      };

      // Create the Argument from the Model
      const arg = await Argument.create({
        creator,
        title,
        description,
        supporting,
      });
      console.log("arg: ", arg)

      // Add the Argument to the args list of the Topic
      topic.args.push(arg);

      //   Save the Topic
      topic.save();

      return response.status(200).json({ success: true });;
    } catch (error) {
      return response.status(400).json({
        success: false,
      });
    }
  }
}
