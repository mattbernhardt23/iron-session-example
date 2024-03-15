import Link from "next/link"
import { User } from '@/server-components/common'

export default function Navbar() {

    return (
        <section>
            <div className="relative py-2">
                <nav className="relative" aria-label="Global">
                    <div className="flex flex-row justify-between sticky w-full border-b-4 border-gray-600 ">
                        <div className="flex flex-row items-center">
                            <Link href='/' legacyBehavior>
                                <a>
                                    Home
                                </a>
                            </Link>
                            <Link href='/about' legacyBehavior>
                                <a>
                                    About
                                </a>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center">
                            <User />
                        </div>
                    </div>
                </nav>
            </div>
        </section>

    )
}

