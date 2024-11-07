import { Modal, Button } from "@server-components/common"
import { ArgumentForm } from "@server-components/form"
import { ReactNode } from "react";

interface ModalProps {
    modalIsOpen: boolean;
    supporting: boolean;
    topic_id: string;
    onClose: () => void;
    children: ReactNode;
}

export default function ArgumentModal({ modalIsOpen, onClose, supporting, topic_id, children }: ModalProps) {
    const closeModal = () => {
        onClose()
    }

    return (
        <Modal modalIsOpen={modalIsOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-2 sm:align-middle sm:w-4/5">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-2xl p-5 text-gray-400 hover:text-gray-600 transition focus:outline-none"
                >
                    &times;
                </button>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <ArgumentForm supporting={supporting} topic_id={topic_id} />
                </div>
            </div>
        </Modal>
    )
}