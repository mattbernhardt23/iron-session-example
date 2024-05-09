"use client"

import * as css from "@/app/css";
import useSession from "@/hooks/useSession";
import { defaultSession } from "@/lib/sessionOptions";

export default function Form() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }

    if (session.isLoggedIn) {
        return (
            <>
                <p className="text-lg">
                    Logged in user: <strong>{session.email}</strong>
                </p>
                <LogoutButton />
            </>
        );
    }

    return <RegisterForm />;
}

function RegisterForm() {
    const { register } = useSession();

    return (
        <form
            onSubmit={function (event) {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const name = formData.get("email") as string;
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const registerObject = {
                    email,
                    password,
                    admin: false,
                    contributor: false,
                    moderator: false,
                    name,
                    birthdate: new Date(),
                    bio: "",
                    city: "",
                    state: "",
                    country: "",
                }
                register(registerObject, {
                    optimisticData: {
                        isLoggedIn: true,
                        registerObject,
                    },
                });
            }}
            method="POST"
            className={css.form}
        >
            <label className="block text-lg">
                <span className={css.label}>Name</span>
                <input
                    type="text"
                    name="name"
                    className={css.input}
                    placeholder=""
                    defaultValue="Harold Haymaker"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <label className="block text-lg">
                <span className={css.label}>Email</span>
                <input
                    type="text"
                    name="email"
                    className={css.input}
                    placeholder=""
                    defaultValue="bigdog@runallday.com"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <label className="block text-lg">
                <span className={css.label}>Password</span>
                <input
                    type="text"
                    name="password"
                    className={css.input}
                    placeholder=""
                    defaultValue="HugoMyGuy"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <div>
                <input type="submit" value="Login" className={css.button} />
            </div>
        </form>
    );
}

function LogoutButton() {
    const { logout } = useSession();

    return (
        <p>
            <a
                className={css.button}
                onClick={(event) => {
                    event.preventDefault();
                    logout(null, {
                        optimisticData: defaultSession,
                    });
                }}
            >
                Logout
            </a>
        </p>
    );
}