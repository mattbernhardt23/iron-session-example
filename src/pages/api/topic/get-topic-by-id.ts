import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    try {
      const { topic_id } = request.query; // Get topic_id from query parameters
      
      if (!topic_id) {
        return response.status(400).json({ success: false, message: 'topic_id is required' });
      }
      
      await dbConnect();

      //   Find the Topic in the Database
      const topic = await Topic.findById(topic_id);
      
      if (!topic) {
        return response.status(404).json({ success: false, message: 'Topic not found' });
      }
      
      
      return response.status(200).json({ data: topic });;
    } catch (error) {
      return response.status(400).json({
        success: false,
      });
    }
  }
}
