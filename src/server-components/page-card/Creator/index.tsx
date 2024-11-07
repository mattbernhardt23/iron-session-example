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
        <>
            <div className="flex flex-row">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image src={img.large} alt="Medium Image" width={100} height={100} />
                </div>
                <div className="flex items-center px-4 font-semibold">
                    {name.first} {name.last}
                </div>
            </div>
        </>
    );
};

export default Creator;
