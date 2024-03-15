import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions, SessionData } from "@lib/sessionOptions";
import dbConnect from "@lib/dbConnect";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@models/User";

const jwtSecret: string | undefined = process.env.JWT_SECRET!;
const generateToken = (id: any) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "30d",
  });
};

// Login Route
export async function POST(req: Request) {
    const data = await req.json();
    const { email, password } = data;

    await dbConnect();

    const user = await User.findOne({ email });

    // Check That Passwords Match
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create the cookie and save

      return Response.json(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Invalid Credentials" }, { status: 401 });
    }
}
