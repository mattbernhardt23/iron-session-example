import { Title } from "@/app/title";
import { Suspense, useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessionOptions";
import { Feed } from "@/server-components/feed"


// Broken: None of these parameters is working, thus we have caching issues
// TODO fix this
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getSession() {
  // @ts-ignore
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}


export default function Home() {


  return (
    <main className="">
      <Title subtitle="Home" />
      <Suspense fallback={<p className="text-lg">Loading...</p>}>
        <Content />
      </Suspense>
      <div className=" mx-auto py-8">
        <Suspense fallback={<p className="text-lg">Loading...</p>}>
          <Feed />
        </Suspense>
      </div>
    </main>
  );
}

async function Content() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/user/login");
  }

  return (
    <div className="max-w-xl space-y-2 text-white">
      <p>
        Hello <strong>{session.email}!</strong>
      </p>
    </div>
  );
}


