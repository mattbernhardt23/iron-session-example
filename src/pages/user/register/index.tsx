import { Button } from "@/server-components/common";
import { redirect } from "next/dist/server/api-utils";
import { useState, useEffect } from 'react'
import useSession from "@hooks/useSession";
import { useRouter } from "next/navigation";
import Register from "@/server-components/form/Register";



export default function RegisterPage() {

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <Register />
        </section>
    );
}