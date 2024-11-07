import { Argument } from "@/lib/types";
import { Description, ArgumentList, ArgumentCard, ArgumentVote, Creator, NewArgument } from "@/server-components/feed-card"


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
        <div className="bg-white rounded-lg shadow-md p-2 mb-4">
            <div className="flex-col mb-4 w-full">
                <div className="font-semibold text-lg text-gray-800">{title}</div>
            </div>
            <ArgumentVote up_votes={up_votes} down_votes={down_votes} />
            <div className="text-gray-600">
                <Creator creator={creator} />
            </div>
            <div className="py-4">
                <Description description={description} />
            </div>
            {objections && (
                <div className="mt-4">
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
            {supports && (
                <div className="mt-4">
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
    );
};

export default Card;