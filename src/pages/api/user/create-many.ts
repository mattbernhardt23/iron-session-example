import { NextApiRequest, NextApiResponse } from "next";
import User from "@models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";


// register
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    
    const bios = request.body;
    const randomUserUrl = "https://randomuser.me/api/?results=10&nat=us,dk,fr,gb";
    
    // Random User API
    const res = await fetch(randomUserUrl);
    const data = await res.json();
    
    await dbConnect();

    for (let i = 0; i < data.results.length; i++) {
      const {
        gender,
        name: { title, first, last },
        location: {
          street: { number, name },
          city,
          state,
          country,
          postcode,
          coordinates: { latitude, longitude },
          timezone: { offset, description },
        },
        email,
        login: { uuid, username, password, salt, md5, sha1, sha256 },
        dob: { date: dobDate, age: dobAge },
        registered: { date: regDate, age: regAge },
        phone,
        cell,
        id: { name: idName, value: idValue },
        picture: { large, medium, thumbnail },
        nat,
      } = data.results[i];

       // Hash Password
    const newSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, newSalt)

      // Find if User Already Exists
      // const userExists = await User.findOne({ email });

      // if (userExists) {
      //   return response
      //     .status(400)
      //     .json({ message: "Email already exists" });
      // }

      const user = await User.create({
        gender,
        name: { title, first, last },
        location: {
          street: { number, name },
          city,
          state,
          country,
          postcode,
          coordinates: { latitude, longitude },
          timezone: { offset, description },
        },
        email,
        login: { uuid, username, password, hashedPassword, salt, md5, sha1, sha256 },
        dob: { date: dobDate, age: dobAge },
        registered: { date: regDate, age: regAge },
        phone,
        cell,
        gov_id: { name: idName, value: idValue },
        picture: { large, medium, thumbnail },
        nat,
        bio: bios[i].bio,
        admin: true,
        contributor: true,
        moderator: true,
      });
    }

    // Send success response
    return response.status(200).json({ message: "Users created successfully" });
  }
}

