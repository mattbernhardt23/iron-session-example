import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    
    try {
      const data = await request.body;
      const { creator_id, title } =
        data;
      await dbConnect();
      
      const topic = await Topic.create({
        creator_id,
        title,
        support_ids: [],
        objection_ids: [],
      });
      
      return response.status(200).json({ topic });

    } catch (error) {

      return response.status(400).json({
        success: false,
      });

    }
  }
}
