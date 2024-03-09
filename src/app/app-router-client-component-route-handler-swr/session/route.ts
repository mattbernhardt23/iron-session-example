import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/lib/sessionOptions";
import { sleep, SessionData } from "@/lib/sessionOptions";

// login
export async function POST(request: NextRequest) {
  // @ts-ignore
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const { username = "No username" } = (await request.json()) as {
    username: string;
  };

  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  // simulate looking up the user in db
  await sleep(250);

  return Response.json(session);
}

// read session
export async function GET() {
  // @ts-ignore
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // simulate looking up the user in db
  await sleep(250);

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
