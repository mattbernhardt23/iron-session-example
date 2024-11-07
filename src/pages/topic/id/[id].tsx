import { getTopicById } from "@lib/getTopicById";
import { getAllTopics } from "@lib/getAllTopics";
import { TopicType } from "@/lib/types";
import { TopicCard } from "@server-components/page-card";
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function Topic({ topic }: { topic: TopicType }) {
    const { _id,
        title,
        creator,
        description,
        args,
        up_votes,
        down_votes, } = topic

    return (
        <div>
            <TopicCard
                _id={_id}
                title={title}
                creator={creator}
                description={description}
                up_votes={up_votes}
                down_votes={down_votes}
                args={args}
            />
        </div>
    );

}

export async function getStaticPaths() {
    const result = await getAllTopics(); // Fetch all topics

    // Access topics from the result
    const topics = result.topics;

    if (!topics) {
        return {
            paths: [],
            fallback: false,
        };
    }

    return {
        paths: topics.map((c: { _id: any; }) => ({
            params: {
                id: c._id, // Assuming the topic has a slug field
            },
        })),
        fallback: false,
    };
}

interface GetTopicResponse {
    data: TopicType | null; // Adjust depending on the actual response structure
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<Params>) => {
    if (!params?.id) {
        return {
            notFound: true,
        };
    }

    const { data }: GetTopicResponse = await getTopicById(params.id);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            topic: data,
        },
    };
};