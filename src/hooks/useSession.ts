import useSWR from "swr";
import { SessionData, defaultSession } from "@/lib/sessionOptions";
import useSWRMutation from "swr/mutation";


const sessionApiRoute =
  "/api/user/session";
 
async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

interface RegisterObject {
    email: String;
    password: String;
    admin: Boolean;
    contributor: Boolean;
    moderator: Boolean;
    name: String;
    bio: String;
    birthdate: Date;
    city: String;
    state: String;
    country: String;
}

function doRegister(url: string, { arg } : { arg : RegisterObject }){
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ 
      email: arg.email, 
      password: arg.password,
      admin: arg.admin,
      contributor: arg.contributor,
      moderator: arg.moderator,
      name: arg.name,
      bio: arg.bio,
      birthdate: arg.birthdate,
      city: arg.city,
      state: arg.state,
      country: arg.country,
    }),
  });
}

interface LoginObject {
  email: string;
  password: string;
}

function doLogin(url: string, { arg }: { arg: LoginObject }) {
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ email: arg.email, password: arg.password }),
  });
}


function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}
 
export default function useSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
    },
  );

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin);
  const { trigger: register } = useSWRMutation("/api/user/register", doRegister);
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

  return { session, logout, register, login, isLoading };
}
