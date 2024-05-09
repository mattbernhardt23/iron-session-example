"use client"
import { TopicList as TopicListType } from "@/lib/types";

const TopicList: React.FC<TopicListType> = ({ topics, children }) => {

    return (
        <div className="flex flex-col mb-8">
            {topics.map((topic) => (
                <div key={topic._id}>
                    {children(topic)}
                </div>))}
        </div>
    );
};

export default TopicList;