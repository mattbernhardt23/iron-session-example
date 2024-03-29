import Link from "next/link"
import { User } from '@/server-components/common'

export default function Navbar() {

    return (
        <section>
            <div className="relative py-2">
                <nav className="relative" aria-label="Global">
                    <div className="flex flex-row justify-between sticky w-full border-b-4 border-gray-600 text-xl font-bold">
                        <div className="flex justify-items-center">
                            <div className="px-4">
                                <Link href='/' legacyBehavior>
                                    <a>
                                        Home
                                    </a>
                                </Link>
                            </div>
                            <div className="px-4">
                                <Link href='/about' legacyBehavior>
                                    <a>
                                        About
                                    </a>
                                </Link>
                            </div>
                            <div className="px-4">
                                <Link href='/topic/new' legacyBehavior>
                                    <a>
                                        New
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-row items-center px-4">
                            <User />
                        </div>
                    </div>
                </nav>
            </div>
        </section>

    )
}

