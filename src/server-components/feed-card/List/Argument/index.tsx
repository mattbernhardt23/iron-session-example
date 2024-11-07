import { ArgumentList as ArgumentListType } from "@/lib/types";
import React from "react";

const ArgumentList: React.FC<ArgumentListType> = ({ args, children }) => {
    return (
        <div className="flex flex-col mb-8 max-h-64 overflow-y-auto shadow-md">
            {/* Supporting Arguments */}
            {args.map((arg) => (
                <div key={arg._id}>
                    {children(arg)}
                </div>
            ))}
        </div>
    );
};

export default ArgumentList;
