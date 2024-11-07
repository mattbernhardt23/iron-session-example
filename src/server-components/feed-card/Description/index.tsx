"use client"
import React, { useState } from 'react';

interface DescriptionProps {
    description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className="overflow-hidden w-full">
            <div>
                {showFullText ? (
                    <div>{description}</div>
                ) : (
                    <div className="line-clamp-3">{description}</div>
                )}
            </div>
            <button onClick={toggleFullText} className="text-blue-500 hover:underline">
                {showFullText ? 'Show Less' : 'Show More'}
            </button>
        </div>
    );
};

export default Description;
