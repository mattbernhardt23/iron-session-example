"use client"

import { Modal } from "@server-components/common"
import { TopicForm } from "@server-components/form"
import * as css from "@/app/css";
import { ReactNode } from "react";

interface TopicModalProps {
    modalIsOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function TopicModal({ modalIsOpen, onClose }: TopicModalProps) {
    const closeModal = () => {
        onClose();
    };

    return (
        <Modal modalIsOpen={modalIsOpen}>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:m-8 sm:align-middle sm:w-4/5">

                {/* X Button in the Top Right Corner */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-2xl p-4 text-gray-400 hover:text-gray-600 transition focus:outline-none"
                >
                    &times;
                </button>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <TopicForm />
                </div>
            </div>
        </Modal>
    );
}
