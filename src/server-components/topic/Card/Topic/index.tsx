"use client";
import { Argument, TopicType } from "@/lib/types";
import { Creator, NewArgument, TopicVote } from "@server-components/card";
import { ArgumentList, ArgumentCard } from "@server-components/topic";


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

    return (
        <div className="bg-white border-slate-800 border-b-4 drop-shadow-lg m-2 rounded-lg p-4">
            <div className="text-slate-800 font-bold text-2xl pb-2 px-4 border-b-2 border-black ">
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
            <div className="flex flex-row w-full">
                <div className="mr-1">
                    {objections.length > 0 && (
                        <div className="flex flex-col items-center">
                            <div className="w-full border-b-2 text-rose-900 border-b-rose-900  m-2">
                                <div className="text-2xl font-semibold text-center p-2">
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
                        <div className="ml-1">
                            <div>
                                <div className="w-full border-b-2 text-emerald-900 border-b-emerald-900  m-2">
                                    <div className="text-2xl font-semibold text-center p-2">
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
            <div>
                <div>
                    <NewArgument topic_id={_id} />
                </div>
            </div>

        </div>
    );
};

export default Card;
