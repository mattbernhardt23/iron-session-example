"use client"
import { Button } from "@server-components/common"
import { ArgumentModal } from "@server-components/card";
import { useState } from "react";

interface NewArgProps {
    topic_id: string;
}
// @params
// we need to pass a topic because it has all the information
export default function NewArgument({ topic_id }: NewArgProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [supporting, setSupporting] = useState(true)

    return (
        <>
            <div>
                <Button
                    variant={"objection"}
                    onClick={() => {
                        setSupporting(false)
                        setModalIsOpen(true)
                    }}
                >
                    New Objection
                </Button>
                <Button
                    variant={"supporting"}
                    onClick={() => {
                        setSupporting(true)
                        setModalIsOpen(true)
                    }}
                >
                    New Supporting Argument
                </Button>
                <ArgumentModal
                    modalIsOpen={modalIsOpen}
                    onClose={() => {
                        setModalIsOpen(false)
                    }}
                    supporting={supporting}
                    topic_id={topic_id}
                    children={undefined}
                />
            </div>
        </>
    )
}