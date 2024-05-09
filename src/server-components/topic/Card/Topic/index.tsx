"use client";
import { Topic } from "@/lib/types";
import { Creator, NewArgument, TopicVote } from "@server-components/card";
import { ArgumentList, ArgumentCard } from "@server-components/topic";
import { Button } from "@server-components/common"

const Card: React.FC<Topic> = ({
    _id,
    title,
    creator,
    description,
    args,
    up_votes,
    down_votes,
}) => {
    const supports = args?.filter((arg) => arg.supporting === true);
    const objections = args?.filter((arg) => arg.supporting === false);

    return (
        <div className="bg-white border-black border-4 rounded-lg p-4 mb-8">
            <div className="font-bold text-2xl pb-2 px-4 border-b-2 border-black text-black">
                <div>
                    <div>{title}</div>
                    <div className="py-2 text-lg">
                        <Creator creator={creator} />
                    </div>
                </div>
                <div>
                    <TopicVote up_votes={up_votes} down_votes={down_votes} />
                </div>
            </div>
            <div>{description}</div>
            <div>
                <div>
                    <NewArgument topic_id={_id} />
                </div>
            </div>
            <div className="flex flex-row">
                <div>
                    {objections.length > 0 && (
                        <div className="flex flex-col items-center">
                            <div className="w-full border-2 border-black rounded-lg m-2">
                                <div className="font-semibold text-center p-2">
                                    Objections
                                </div>
                            </div>

                            <div>
                                <ArgumentList args={objections}>
                                    {(argument) => {
                                        return (
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
                                        );
                                    }}
                                </ArgumentList>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {supports.length > 0 && (
                        <div>
                            <div>
                                <div className="w-full border-2 border-black rounded-lg m-2">
                                    <div className="font-semibold text-center p-2">
                                        Supporting Arguments
                                    </div>
                                </div>
                                <ArgumentList args={supports}>
                                    {(argument) => {
                                        return (
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
                                        );
                                    }}
                                </ArgumentList>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
