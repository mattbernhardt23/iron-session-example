"use client"
import { Button } from "@server-components/common"
import { TopicModal } from "@server-components/card";
import { useState } from "react";



export default function NewTopic() {
    const [modalIsOpen, setModalIsOpen] = useState(false)


    return (
        <>
            <div className="m-2">
                <Button
                    variant={"newTopic"}
                    onClick={() => {
                        setModalIsOpen(true)
                    }}
                >
                    New Topic
                </Button>
                <TopicModal
                    modalIsOpen={modalIsOpen}
                    onClose={() => {
                        setModalIsOpen(false)
                    }}
                    children={undefined}
                />
            </div>
        </>
    )
}