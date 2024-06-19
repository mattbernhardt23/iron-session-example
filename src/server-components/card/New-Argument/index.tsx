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
            <div className="w-full flex flex-row space-x-2 my-2">
                <div className="flex-1">
                    <Button
                        variant={"argObjection"}
                        onClick={() => {
                            setSupporting(false);
                            setModalIsOpen(true);
                        }}
                        className="w-full"
                    >
                        Objection
                    </Button>
                </div>
                <div className="flex-1">
                    <Button
                        variant={"argSupporting"}
                        onClick={() => {
                            setSupporting(true);
                            setModalIsOpen(true);
                        }}
                        className="w-full"
                    >
                        Supporting Argument
                    </Button>
                </div>
            </div>
            <ArgumentModal
                modalIsOpen={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                }}
                supporting={supporting}
                topic_id={topic_id}
                children={undefined}
            />
        </>
    );
}