import { Feed } from "@/lib/types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const feedApiRoute = "/api/feed"
 
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
 

// Define the defaultFeed object
const defaultFeed: Feed = {
  topics: {
      topics: [], 
      children: () => null, 
  },
};

function doGetFeed( url: string ){
    return fetchJson<Feed>(url, {
      method: "GET",
    });
}

export default function useFeed() {
    const { data: topics, isLoading } = useSWR(
      feedApiRoute,
      fetchJson<Feed>,
      {
          fallbackData: defaultFeed,
        },
    );
    
    const { trigger: getFeed } = useSWRMutation(feedApiRoute, doGetFeed);
    
  
    return { topics, getFeed, isLoading };
  }