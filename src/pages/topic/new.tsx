import { Title } from "@/app/title";
import * as css from "@/app/css";

import { getIronSession } from "iron-session";
import {
    SessionData,
    sessionOptions,
} from "@/lib/sessionOptions";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Topic from "@/server-components/form/Topic";



export default function TopicPage() {

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <Topic />
        </section>
    );
}

export const getServerSideProps = (async (context) => {
    const session = await getIronSession<SessionData>(
        context.req,
        context.res,
        sessionOptions,
    );

    if (!session.isLoggedIn) {
        return {
            redirect: {
                destination: "/user/login",
                permanent: false,
            },
        };
    }

    return { props: { session } };
}) satisfies GetServerSideProps<{
    session: SessionData;
}>;