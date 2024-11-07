"use client"
import React, { useState } from 'react';
import { ArrowCircleUp, ArrowCircleDown } from '@mui/icons-material';

interface VoteProps {
    up_votes: number;
    down_votes: number;
}

const TopicVote: React.FC<VoteProps> = ({ up_votes, down_votes }) => {
    const [upVotes, setUpVotes] = useState<number>(up_votes);
    const [downVotes, setDownVotes] = useState<number>(down_votes);

    const handleVote = (type: 'up' | 'down') => {
        if (type === 'up') {
            setUpVotes(upVotes + 1);
        } else if (type === 'down') {
            setDownVotes(downVotes + 1);
        }
        // Call the onVote function to update the database
    };

    return (
        <div className="w-full flex justify-between items-center text-gray-700 font-semibold py-4">
            {/* Down Votes */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleVote('down')}>
                <ArrowCircleDown className="hover:text-red-600 transition-colors" />
                <span>{downVotes}</span>
                <div className="px-3 py-1 border-2 border-gray-300 rounded-lg text-sm">
                    No, we should not!
                </div>
            </div>

            {/* Up Votes */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleVote('up')}>
                <div className="px-3 py-1 border-2 border-gray-300 rounded-lg text-sm">
                    Yes, we should!
                </div>
                <span>{upVotes}</span>
                <ArrowCircleUp className="hover:text-green-600 transition-colors" />
            </div>
        </div>
    );
};

export default TopicVote;
