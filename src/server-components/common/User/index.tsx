"use client"; // This is a client component 
import Link from "next/link"
import { Button } from '@/server-components/common'
import useSession from "@hooks/useSession"
import { defaultSession } from "@lib/sessionOptions"



export default function User() {
    const { session, logout } = useSession();

    return (
        <div className='flex space-x-2 mr-4' >
            {session.isLoggedIn ? (
                <div>
                    <Button
                        variant="lightGray"
                        onClick={() => new Promise<void>((resolve) => {
                            logout(null, {
                                optimisticData: defaultSession,
                            });
                            resolve();
                        })}

                    >
                        Sign Out
                    </Button>
                </div>
            ) : (
                <>
                    <div className="px-4">
                        <Link href='/user/login' legacyBehavior>
                            <a>
                                <Button
                                    variant='gray'
                                >
                                    Sign In
                                </Button>
                            </a>
                        </Link>
                    </div>
                    <div className="px-4">
                        <Link href='/user/register' legacyBehavior>
                            <a>
                                <Button
                                    variant='gray'
                                >
                                    Register
                                </Button>
                            </a>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

