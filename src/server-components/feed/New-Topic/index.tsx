"use client"
import { TopicModal } from "@/server-components/feed-card";
import { useState } from "react";



export default function NewTopic() {
    const [modalIsOpen, setModalIsOpen] = useState(false)


    return (
        <>
            <div className="hover:text-blue-700">
                <button
                    onClick={() => {
                        setModalIsOpen(true)
                    }}
                >
                    New Topic
                </button>
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