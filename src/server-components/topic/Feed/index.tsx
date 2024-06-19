"use client"
import { useEffect, useState } from "react";
import { TopicCard, TopicList, NewTopic } from "@server-components/topic";
import { Feed } from "@lib/types";
import useFeed from "@/hooks/useFeed";

export default function Feed() {
    const { getFeed, isLoading } = useFeed();
    const [topics, setTopics] = useState<Feed>();

    useEffect(() => {
        async function fetchData() {
            const topics = await getFeed();
            setTopics(topics);
        }
        fetchData();
    }, [getFeed]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log("topics", topics);

    return (
        <div>
            <NewTopic />
            <div>
                {topics ? (
                    Array.isArray(topics.topics) ? (
                        <div>
                            <TopicList topics={topics.topics}>
                                {topic => (
                                    <TopicCard
                                        key={topic._id}
                                        _id={topic._id}
                                        creator={topic.creator}
                                        title={topic.title}
                                        description={topic.description}
                                        args={topic.args}
                                        up_votes={topic.up_votes}
                                        down_votes={topic.down_votes}
                                    />
                                )}
                            </TopicList>
                        </div>
                    ) : (
                        <div>No topics available</div>
                    )) : (
                    <div>No topics available</div>
                )}
            </div>
        </div>
    );
}
