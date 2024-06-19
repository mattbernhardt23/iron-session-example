import { Title } from "@/app/title";
import { Suspense, useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessionOptions";
import useFeed from "@/hooks/useFeed";
import { Feed } from "@server-components/topic"


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
      <Title subtitle="Protected page" />
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
    <div className="max-w-xl space-y-2">
      <p>
        Hello <strong>{session.email}!</strong>
      </p>
      <p>
        This page is protected and can only be accessed if you are logged in.
        Otherwise you will be redirected to the login page.
      </p>
      <p>The check is done via a server component.</p>
    </div>
  );
}


