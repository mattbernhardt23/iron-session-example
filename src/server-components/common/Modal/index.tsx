import { ReactNode } from "react";

interface ModalProps {
    modalIsOpen: boolean;
    children: ReactNode;
}

export default function Modal({ modalIsOpen, children }: ModalProps) {
    return (
        <section>
            <div
                className={`${!modalIsOpen && "hidden"} fixed z-10 inset-0 overflow-y-auto"`}
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-end justify-center h-32 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {modalIsOpen && (
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>
                    )}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    {children}
                </div>
            </div>
        </section>
    );
}
