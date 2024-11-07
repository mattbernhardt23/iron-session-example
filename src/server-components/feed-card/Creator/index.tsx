"use client";
import Image from "next/image";

interface CreatorProps {
    creator: {
        name: {
            title: string;
            first: string;
            last: string;
        };
        img: {
            large: string;
            medium: string;
            thumbnail: string;
        };
    };
}

const Creator: React.FC<CreatorProps> = ({ creator }) => {
    const { name, img } = creator;


    return (
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                <Image src={img.large} alt={`${name.first} ${name.last}`} width={48} height={48} />
            </div>
            <div className="ml-4 text-gray-800 font-medium">
                {name.first} {name.last}
            </div>
        </div>
    );

};

export default Creator;
