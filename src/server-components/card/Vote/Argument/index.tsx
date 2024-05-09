"use client"
import React, { useState } from 'react';
import { ArrowCircleUp, ArrowCircleDown } from '@mui/icons-material';

interface VoteProps {
    up_votes: number;
    down_votes: number;
}

const ArgumentVote: React.FC<VoteProps> = ({ up_votes, down_votes }) => {
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
        <div className="w-full flex flex-row justify-between font-semibold">
            {/* Down Votes */}
            <div className="mx-2 flex flex-row" onClick={() => handleVote('down')}>
                <div className="flex items-center px-2" >
                    {downVotes}
                </div>
                <span role="img" aria-label="Down Arrow" className="hover:text-blue-800 hover:cursor-pointer">
                    <ArrowCircleDown />
                </span>
            </div>
            {/* Up Votes */}
            <div className="mx-2 flex flex-row" onClick={() => handleVote('up')}>
                <span role="img" aria-label="Up Arrow" className="hover:text-blue-800 hover:cursor-pointer flex items-center">
                    <ArrowCircleUp />
                </span>
                <div className="flex items-center px-2" >
                    {upVotes}
                </div>
            </div>
        </div>
    );
};

export default ArgumentVote;