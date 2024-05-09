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


// login
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
    const { email, password } = data;

    await dbConnect();

    const user = await User.findOne({ email });

    
    // Check That Passwords Match
    if (user && (await bcrypt.compare(password, user.login.hashedPassword))) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
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

  } else if (request.method === "GET") {
    if (session.isLoggedIn !== true) {
      return response.json(defaultSession);
    }

    return response.json(session);
  } else if (request.method === "DELETE") {
    session.destroy();

    return response.json(defaultSession);
  }

  return response.status(405).end(`Method ${request.method} Not Allowed`);
}


