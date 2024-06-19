import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { TopicType, AddArgument, Feed } from "@/lib/types";

const topicApiRoute = "/api/topic/new";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  console.log("input: ", input)
  const res = await fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  })

  return res.json()
}

const defaultTopic = {
  _id: "",
  creator: {
    _id: "",
    name: {
      title: "",
      first: "",
      last: "",
    },
    img: {
      large: "",
      medium: "",
      thumbnail: "",
    },
  },
  title: "",
  description: "",
  args: [],
  up_votes: 0,
  down_votes: 0,
};

function doCreateTopic(url: string, { arg }: { arg: TopicType }) {

  const res = fetchJson<TopicType>(url, {
    method: "POST",
    body: JSON.stringify({
      creator_id: arg.creator._id,
      title: arg.title,
    }),
  });

  return res;
}

function doAddArgument(url: string, { arg }: {arg: AddArgument}) {

  const res = fetchJson<AddArgument>(url, {
    method: "PUT",
    body: JSON.stringify({
      topic_id: arg.topic_id,
      creator_id: arg.creator._id,
      title: arg.title,
      description: arg.description,
      supporting: arg.supporting
    })
  });

  return res
}

function doDeleteTopic(url: string) {
  return fetchJson<TopicType>(url, {
    method: "DELETE",
  });
}

export default function useTopic() {
  const { data: topic, isLoading } = useSWR(topicApiRoute, fetchJson<TopicType>, {
    fallbackData: defaultTopic,
  });


  const { trigger: createTopic } = useSWRMutation(
    "/api/topic/new",
    doCreateTopic
  );

  const { trigger: addArgument } = useSWRMutation(
    "api/topic/add-argument",
    doAddArgument
  )

  const { trigger: deleteTopic } = useSWRMutation("/api/topic", doDeleteTopic);

  return { topic, deleteTopic, createTopic, addArgument, isLoading };
}
