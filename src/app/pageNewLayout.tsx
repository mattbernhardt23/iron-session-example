import React from "react";

// Card component
interface CardProps {
    title: string;
    description: string;
    upVotes: number;
    downVotes: number;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    upVotes,
    downVotes,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 m-4">
            {/* Header */}
            <div className="flex flex-row justify-between">
                <div className="mb-2 font-semibold">{title}</div>
                {/* Vote Container */}
                <div className="flex flex-row">
                    {/* Up Votes */}
                    <div className="mx-2 flex flex-row">
                        <span role="img" aria-label="Up Arrow">
                            👍
                        </span>
                        {"  "}{upVotes}
                    </div>
                    {/* Down Votes */}
                    <div className="mx-2 flex flex-row">
                        <span role="img" aria-label="Down Arrow">
                            👎
                        </span>
                        {"  "}{downVotes}
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>{description}</div>
        </div>
    );
};

// List component
interface ListProps {
    title: string;
    items: {
        for: {
            title: string;
            description: string;
            upVotes: number;
            downVotes: number;
        }[];
        against: {
            title: string;
            description: string;
            upVotes: number;
            downVotes: number;
        }[];
    };
}

const List: React.FC<ListProps> = ({ title, items }) => {
    return (
        <div className="flex flex-col md:flex-row mb-8">
            {/* Main Box */}
            <div className="md:w-full md:mr-4">
                {/* Header for Topic */}
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {/* Topic Description */}
                <p className="mb-4">Topic description goes here.</p>
                {/* Arguments For and Against */}
                <div className="flex">
                    {/* Arguments For */}
                    <div className="md:w-1/2">
                        <h3 className="text-lg font-semibold mb-2">Arguments For</h3>
                        {/* Map through items and render Card components */}
                        {items.for.map((item, index) => (
                            <Card
                                key={index}
                                title={item.title}
                                description={item.description}
                                upVotes={item.upVotes}
                                downVotes={item.downVotes}
                            />
                        ))}
                    </div>
                    {/* Arguments Against */}
                    <div className="md:w-1/2">
                        <h3 className="text-lg font-semibold mb-2">Arguments Against</h3>
                        {/* Map through items and render Card components */}
                        {items.against.map((item, index) => (
                            <Card
                                key={index}
                                title={item.title}
                                description={item.description}
                                upVotes={item.upVotes}
                                downVotes={item.downVotes}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Home component
const Home: React.FC = () => {
    // Mock data for demonstration
    const topic = {
        title: "Topic Title",
        items: {
            for: [
                {
                    title: "Argument 1 Title",
                    description: "Argument 1 Description",
                    upVotes: 23,
                    downVotes: 14,
                },
                {
                    title: "Argument 2 Title",
                    description: "Argument 2 Description",
                    upVotes: 23,
                    downVotes: 14,
                },
            ],
            against: [
                {
                    title: "Argument 1 Title",
                    description: "Argument 1 Description",
                    upVotes: 23,
                    downVotes: 14,
                },
                {
                    title: "Argument 2 Title",
                    description: "Argument 2 Description",
                    upVotes: 23,
                    downVotes: 14,
                },
            ],
        },
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Render List component with topic data */}
            <List title={topic.title} items={topic.items} />
        </div>
    );
};

export default Home;



// return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Render List component with topic data */}
//       <TopicList title={topic.title} items={topic.items} />
//     </div>
//   );