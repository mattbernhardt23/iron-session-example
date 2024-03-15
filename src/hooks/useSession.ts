import useSWR from "swr";
import { SessionData, defaultSession } from "@/lib/sessionOptions";
import useSWRMutation from "swr/mutation";

// const sessionApiRoute =
//   "/app-router-client-component-route-handler-swr/session";
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
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

  return { session, logout, login, isLoading };
}
