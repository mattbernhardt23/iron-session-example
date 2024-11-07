"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Search } from '@/server-components/common';
import { NewTopic } from '@/server-components/feed';


export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header>
            <nav className={`fixed top-0 z-50 py-2 ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'} w-full`} aria-label="Global">
                <div className="flex flex-row justify-between items-center w-full text-xl font-bold"

                >
                    {/* Left-side Links */}
                    <div className="flex">
                        <div className="px-4 hover:text-blue-700">
                            <Link href="/" legacyBehavior>
                                <a>Public Square</a>
                            </Link>
                        </div>
                        <div className="px-4">
                            <NewTopic />
                        </div>
                    </div>

                    {/* Centered Search */}
                    <div className="flex-grow">
                        <Search />
                    </div>

                    {/* Right-side User */}
                    <div className="px-4">
                        <User />
                    </div>
                </div>
            </nav>
        </header>
    );
}
