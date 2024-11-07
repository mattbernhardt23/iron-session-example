import { TopicType } from "@/lib/types";
import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
import User from "@models/User"
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
}

type ResponseData = {
  topic?: TopicType,
  success?: boolean
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  if (request.method === "POST") {
    try {
      const data = await request.body;
      const { creator_id, title, description } = data;
      console.log("data: ", data)
      await dbConnect();
      // Find the User to Create the Creator Object
      const user = await User.findById(creator_id);
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

      
      const topic = await Topic.create({
        creator,
        title,
        description
      });
      console.log("topic: ", topic)
      
      return response.status(200).json({ topic: topic });

    } catch (error) {
      console.log("error: ", error)
      return response.status(400).json({
        success: false,
      });

    }
  }
}
