import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import {
  defaultSession,
  sessionOptions,
  SessionData,
} from "@lib/sessionOptions"
import User from "@models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";


//  This is totally fucked right now
// register
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  if (request.method === "POST") {
    const data = request.body;
    const {
        email,
        password,
        admin,
        contributor,
        moderator,
        name,
        bio,
        birthdate,
        city,
        state,
      } = data;

      // Validation
     if( !email || !password  || email === ""|| password === ""){
        return response.status(400).json({ message: "Please include all fields" });
      }

    await dbConnect();

    //Find if User Already Exists
    const userExists = await User.findOne({email})

    if(userExists) {
      return response.status(400).json({ message: "Email already exists" });
    }
    
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      email,
      password: hashedPassword,
      admin,
      contributor,
      moderator,
      name,
      bio,
      birthdate,
      city,
      state,
    });

    if(user) {
        // Create the cookie and save
      session.id = user._id;
      session.isLoggedIn = true;
      session.email = email;
      session.password = hashedPassword
      await session.save();

      return response.status(200).json(session);
    } else {
      return response.status(401).json({ message: "Invalid Credentials" });
    }
  }
}
