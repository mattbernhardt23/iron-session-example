import { Argument } from "@/lib/types";
import { ArgumentList, ArgumentCard } from "@server-components/topic"
import { Description, ArgumentVote, Creator, NewArgument } from "@server-components/card"


const Card: React.FC<Argument> = ({
    _id,
    title,
    creator,
    description,
    up_votes,
    down_votes,
    args
}) => {
    const supports = args?.filter((arg) => arg.supporting === true)
    const objections = args?.filter((arg) => arg.supporting === false)

    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-black">
            {/* Header */}
            <div className="flex flex-col justify-between">
                <div className="mb-2 font-semibold">{title}</div>
                <Creator creator={creator} />
                <ArgumentVote up_votes={up_votes} down_votes={down_votes} />
            </div>
            {/* Description */}
            <div className="w-full">
                <Description description={description} />
            </div>
            {/*  */}
            <div>
                <NewArgument topic_id={_id} />
            </div>
            <div>
                {objections ? (
                    <div>
                        <ArgumentList
                            args={objections}
                        >
                            {argument => {
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
                                )
                            }}
                        </ArgumentList>
                    </div>
                ) : (
                    <div></div>
                )}
                {supports ? (
                    <div className="">
                        <ArgumentList
                            args={supports}
                        >
                            {argument => {
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
                                )
                            }}
                        </ArgumentList>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default Card;