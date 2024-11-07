"use client";
import { Argument, TopicType } from "@/lib/types";
import { Creator, NewArgument, TopicVote } from "@/server-components/feed-card";
import { ArgumentList, ArgumentCard } from "@/server-components/feed-card";
import { useRouter } from 'next/navigation';

const Card: React.FC<TopicType> = ({
    _id,
    title,
    creator,
    description,
    args,
    up_votes,
    down_votes,
}) => {
    const supports = args?.filter((arg: Argument) => arg.supporting === true);
    const objections = args?.filter((arg: Argument) => arg.supporting === false);
    const router = useRouter();


    const handleClick = (topicId: any) => {
        // Perform a shallow route change (preserve component state)
        router.push(`/topic/id/${topicId}`);
    };

    return (
        <div className="bg-white border border-gray-300 drop-shadow-md m-4 rounded-lg p-6">
            <div className="text-gray-800 font-bold text-2xl pb-4 border-b-2 border-gray-200">
                <div onClick={() => handleClick(_id)} className="cursor-pointer hover:underline">
                    {title}
                </div>
                <div className="py-2 text-lg text-gray-600">
                    <Creator creator={creator} />
                </div>
            </div>
            <div className="text-gray-700 pt-4">
                {description}
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full pt-4">
                <div className="w-full md:w-1/2 p-2">
                    {objections.length > 0 && (
                        <div className="flex flex-col items-center">
                            <div
                                className={`flex flex-row justify-between w-full ${down_votes > up_votes
                                    ? "bg-rose-900 text-white border-2 border-rose-900 rounded-lg p-4"
                                    : "text-rose-900 border-2 border-rose-900 rounded-lg p-4"
                                    } mb-4 text-xl font-semibold`}
                            >
                                <div className="">Objection</div>
                                <div>{down_votes}</div>
                            </div>
                            <ArgumentList args={objections}>
                                {(argument) => (
                                    <ArgumentCard
                                        key={argument._id}
                                        title={argument.title}
                                        description={argument.description}
                                        up_votes={argument.up_votes}
                                        down_votes={argument.down_votes}
                                        _id={argument._id}
                                        supporting={argument.supporting}
                                        creator={argument.creator}
                                        args={argument.args}
                                    />
                                )}
                            </ArgumentList>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-2">
                    {supports.length > 0 && (
                        <div>
                            <div
                                className={`flex flex-row justify-between ${up_votes > down_votes
                                    ? "bg-emerald-900 text-white border-2 border-emerald-900 rounded-lg p-4"
                                    : "text-emerald-900 border-2 border-emerald-900 rounded-lg p-4"
                                    } mb-4 text-xl font-semibold`}
                            >
                                <div>{up_votes}</div>
                                <div className="">Agreement</div>
                            </div>
                            <ArgumentList args={supports}>
                                {(argument) => (
                                    <ArgumentCard
                                        key={argument._id}
                                        title={argument.title}
                                        description={argument.description}
                                        up_votes={argument.up_votes}
                                        down_votes={argument.down_votes}
                                        _id={argument._id}
                                        supporting={argument.supporting}
                                        creator={argument.creator}
                                        args={argument.args}
                                    />
                                )}
                            </ArgumentList>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );

};

export default Card;
