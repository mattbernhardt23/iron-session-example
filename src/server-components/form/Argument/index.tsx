"use client";
import { Button } from "@server-components/common"
import useTopic from "@/hooks/useTopic";
import useSession from "@/hooks/useSession";

interface ArgumentFormProps {
    supporting: boolean;
    topic_id: string;
}

const ArgumentForm = ({ supporting, topic_id }: ArgumentFormProps) => {
    const { session } = useSession()
    const { addArgument } = useTopic()


    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const title = formData.get("title") as string;
                const description = formData.get("description") as string;
                const creator = {
                    _id: session.id,
                    name: {
                        title: "",
                        first: "",
                        last: "",
                    },
                    img: {
                        large: "",
                        medium: "",
                        thumbnail: "",
                    }
                }
                const argumentObject = {
                    _id: "",
                    topic_id,
                    creator,
                    title,
                    description,
                    supporting,
                    up_votes: 0,
                    down_votes: 0,
                }
                addArgument(argumentObject, {
                    optimisticData: {
                        isLoggedIn: true,
                        argumentObject,
                    },
                });
            }}
        >
            <div className="mb-2">
                <label htmlFor="title" className="block">
                    Title:
                </label>
                <textarea
                    id="title"
                    name="title"
                    className="border rounded-md p-1 mt-1 w-full h-16" // Adjust height as needed
                    placeholder="Enter title..."
                />
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="block">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="border rounded-md p-1 mt-1 w-full h-40" // Adjust height as needed
                    placeholder="Enter description..."
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default ArgumentForm;
