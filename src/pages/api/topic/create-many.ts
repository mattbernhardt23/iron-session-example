import dbConnect from "@lib/dbConnect";
import Topic from "@models/Topic";
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

      const users = await User.find()
      
      const topics = [];

      for (let i = 0; i < data.length; i++) {
        var { creator, args, title, up_votes, down_votes } = data[i];
        
        
        // Generate a random number between 0 and 9
        const randomNumber = Math.floor(Math.random() * users.length - 1);
        creator._id = users[randomNumber]._id;
        creator.name.first = users[randomNumber].name.first;
        creator.name.last = users[randomNumber].name.last;
        creator.name.title = users[randomNumber].name.title;
        creator.img.medium = users[randomNumber].picture.medium;
        creator.img.large = users[randomNumber].picture.large
        creator.img.thumbnail = users[randomNumber].picture.thumbnail
        up_votes = Math.floor(Math.random() * 100);
        down_votes = Math.floor(Math.random() * 100);

        const topic = await Topic.create({
          creator,
          title,
          up_votes,
          down_votes
        });

        for(let j = 0; j < data[i].args.length; j++){
          const newNum = Math.floor(Math.random() * (users.length - 1));
          
          args[j].creator._id = users[newNum]._id
          args[j].creator.name.first = users[newNum].name.first
          args[j].creator.name.last = users[newNum].name.last
          args[j].creator.name.title = users[newNum].name.title
          args[j].creator.img.medium = users[newNum].picture.medium
          args[j].creator.img.large = users[newNum].picture.large
          args[j].creator.img.thumbnail = users[newNum].picture.thumbnail
          args[j].up_votes = Math.floor(Math.random() * 100); 
          args[j].down_votes = Math.floor(Math.random() * 100); 
          topic.args.push(args[j])
        }

        topic.save()

        console.log("topic: ", topic)
          


        topics.push(topic);
      }

      return response.status(200).json(topics);

    } catch (error) {

      return response.status(400).json({
        success: false,
      });

    }
  }
}
