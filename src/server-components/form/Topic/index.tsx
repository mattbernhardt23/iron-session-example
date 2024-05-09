"use client"

import * as css from "@/app/css";
import useSession from "@/hooks/useSession";
import useTopic from "@/hooks/useTopic";
import { defaultSession } from "@/lib/sessionOptions";

export default function Form() {
    const { isLoading, session } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }


    return <NewTopicForm />;
}

function NewTopicForm() {
    const { session } = useSession();
    const { createTopic } = useTopic()

    return (
        <form
            onSubmit={function (event) {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const title = formData.get("title") as string;
                const description = formData.get("description") as string;
                const topicObject = {
                    _id: "",
                    creator: {
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
                    },
                    title,
                    description,
                    up_votes: 0,
                    down_votes: 0,
                    args: [],
                }
                console.log(topicObject)
                createTopic(topicObject, {
                    optimisticData: {
                        topicObject,
                    },
                });
            }}
            method="POST"
            className={css.form}
        >
            <label className="block text-lg">
                <span className={css.label}>Header</span>
                <input
                    type="text"
                    name="title"
                    className={css.input}
                    placeholder=""
                    defaultValue="Is XYZ a good idea?"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <label className="block text-lg">
                <span className={css.label}>Description</span>
                <input
                    type="text"
                    name="description"
                    className={css.input}
                    placeholder=""
                    defaultValue="This is a further description of what the header touches on."
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <div>
                <input type="submit" value="Submit" className={css.button} />
            </div>
        </form>
    );
}
