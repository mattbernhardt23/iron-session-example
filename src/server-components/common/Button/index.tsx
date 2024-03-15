import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
    hoverable?: boolean;
    variant?: "white" | "red" | "gray" | "lightGray" | "searchLightGray" | "delete";
    onClick?: () => Promise<void>;
}

const SIZE = {
    sm: "p-1 text-xs xs:px-4",
    md: "p-2 text-base xs:px-8",
    lg: "p-3 text-lg xs:px-8"
}

export default function Button({
    children,
    className = "",
    size = "md",
    hoverable = true,
    variant = "white",
    onClick,
    ...rest
}: ButtonProps) {

    const sizeClass = SIZE[size]
    const variants = {
        white: `rounded-md text-black bg-white`,
        red: `rounded-md text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
        gray: `rounded-md text-white bg-gray-600 ${hoverable && "hover:bg-red-700"}`,
        lightGray: `rounded-md text-red-700 bg-gray-100 border-gray-600 border-2 ${hoverable && "hover:bg-gray-600"}`,
        searchLightGray: `rounded-r-md text-red-700 bg-gray-100 border-gray-600 border-2 hadow-inner shadow-gray-600 ${hoverable && "hover:bg-gray-600"}`,
        delete: `rounded-xl text-red-700 bg-white border-red-700 border-2 ${hoverable && "hover:bg-red-700 hover:text-white"}`,
    }

    return (
        <button
            {...rest}
            onClick={onClick}
            className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed borderfont-medium ${className} ${variants[variant]}`}>
            {children}
        </button>
    )
}
