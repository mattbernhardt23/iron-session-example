import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    
    try {
      
      await dbConnect();
      
      const topics = await Topic.find()

      
      return response.status(200).json({ topics });

    } catch (error) {

      return response.status(400).json({
        success: false,
      });

    }
  }
}
