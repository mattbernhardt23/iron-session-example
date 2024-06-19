"use client"

import { Modal, Button } from "@server-components/common"
import { TopicForm } from "@server-components/form"
import * as css from "@/app/css";
import useSession from "@/hooks/useSession";
import useTopic from "@/hooks/useTopic";
import { ReactNode } from "react";

interface TopicModalProps {
    modalIsOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function TopicModal({ modalIsOpen, onClose, children }: TopicModalProps) {
    const { session } = useSession();
    const { createTopic } = useTopic()

    const closeModal = () => {
        onClose()
    }

    return (
        <Modal
            modalIsOpen={modalIsOpen}
        >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-2 sm:align-middle sm:w-4/5">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                                    isLoggedIn: true,
                                    topicObject,
                                },
                            }).then((res) => {
                                console.log("response: ", res);
                                closeModal()
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
                        <div className="flex flex-row justify-between">
                            <input type="submit" value="Submit" className={css.button} />
                            <Button onClick={() => {
                                closeModal()
                            }} >Cancel</Button>
                        </div>
                    </form>

                </div>
            </div>
        </Modal>
    )
}