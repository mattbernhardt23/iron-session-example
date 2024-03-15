import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@lib/sessionOptions";
import { SessionData } from "@lib/sessionOptions";
import User from "@models/User";
import dbConnect from "@lib/dbConnect";
import bcrypt from "bcrypt";

// login
export async function POST(request: NextRequest) {
  // @ts-ignore
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const data = await request.json();
    const { email, password } = data;

    await dbConnect();

    const user = await User.findOne({ email });

    // Check That Passwords Match
    if (user && (await bcrypt.compare(password, user.password))) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create the cookie and save
      session.id = user._id;
      session.isLoggedIn = true;
      session.email = email;
      session.password = hashedPassword
      await session.save();

      return Response.json(
        {
          session: session,
        },
        { status: 200 }
      );
    } else {
      return  Response.json({ message: "Invalid Credentials" }, { status: 401 });
    }
}
 
// read session
export async function GET() {
  // @ts-ignore
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  // @ts-ignore
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
